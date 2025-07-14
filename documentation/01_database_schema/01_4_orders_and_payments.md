# Veritabanı Şeması: Siparişler, Ödemeler ve Kargo

## 1. Mimarinin Mantığı

Sipariş yönetimi sistemi, bir dizi birbiriyle ilişkili tablodan oluşur ve bir alışverişin tüm yaşam döngüsünü kaydeder.

- **`orders`**: Her bir sipariş için ana kayıt tablosudur. Siparişi veren kullanıcıyı, teslimat ve fatura adreslerini, siparişin genel durumunu (örneğin 'Ödeme Bekleniyor', 'Hazırlanıyor', 'Kargolandı'), toplam tutarı ve ödeme ile ilgili referansları içerir.
- **`order_items`**: Bir siparişin içindeki her bir farklı ürünü (varyantı) ayrı bir satır olarak tutar. Bu tabloda, satın alma anındaki ürün fiyatı ve miktarı saklanır. Fiyatın burada tekrar saklanması önemlidir, çünkü ana ürünün fiyatı gelecekte değişse bile geçmiş siparişlerin doğru fiyattan kaydedilmesini sağlar.
- **`shipments`**: Bir siparişin kargo sürecini takip etmek için kullanılır. Kargo firması, takip numarası ve kargo durumu gibi bilgileri içerir. Başlangıçta bir sipariş için bir kargo kaydı olacağını varsayıyoruz.

## 2. SQL Tablo Tanımları

PostgreSQL'in `ENUM` veri tipi, `status` gibi belirli değerleri alabilen alanlar için veri bütünlüğünü sağlamak adına oldukça kullanışlıdır.

```sql
-- Sipariş durumlarını yönetmek için özel bir ENUM tipi oluşturuyoruz.
CREATE TYPE order_status AS ENUM (
    'pending_payment',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

-- Kargo durumlarını yönetmek için özel bir ENUM tipi.
CREATE TYPE shipment_status AS ENUM (
    'pending',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'failed'
);

-- orders: Her bir müşteri siparişinin ana kaydını tutar.
CREATE TABLE orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    shipping_address_id BIGINT NOT NULL REFERENCES addresses(id) ON DELETE RESTRICT,
    billing_address_id BIGINT REFERENCES addresses(id) ON DELETE RESTRICT,
    
    status order_status DEFAULT 'pending_payment' NOT NULL,
    
    total_price_in_cents INT NOT NULL,
    shipping_cost_in_cents INT DEFAULT 0,
    
    payment_provider TEXT, -- 'stripe', 'paypal' etc.
    payment_intent_id TEXT, -- Ödeme sağlayıcısından gelen referans ID
    
    notes TEXT, -- Müşterinin sipariş notu
    
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);


-- order_items: Bir siparişteki her bir satılabilir birimi (varyantı) temsil eder.
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id BIGINT NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT, -- Ürünün silinmemesi için RESTRICT
    
    quantity INT NOT NULL CHECK (quantity > 0),
    price_per_item_in_cents INT NOT NULL, -- Satın alma anındaki birim fiyat
    
    UNIQUE(order_id, variant_id)
);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_variant_id ON order_items(variant_id);


-- shipments: Siparişlerin kargo ve teslimat bilgilerini saklar.
CREATE TABLE shipments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    
    shipping_provider TEXT, -- 'MNG Kargo', 'Yurtiçi Kargo' etc.
    tracking_number TEXT,
    tracking_url TEXT,
    
    status shipment_status DEFAULT 'pending' NOT NULL,
    
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_shipments_order_id ON shipments(order_id);

-- RLS Politikaları
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders."
ON orders FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view items in their own orders."
ON order_items FOR SELECT USING (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view shipments for their own orders."
ON shipments FOR SELECT USING (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);

--
-- İade Yönetimi Tabloları (Returns / RMA)
--

-- İade durumlarını yönetmek için özel bir ENUM tipi.
CREATE TYPE return_status AS ENUM (
    'pending_approval',
    'approved',
    'rejected',
    'shipped_by_customer',
    'received',
    'refund_processed'
);

-- returns: Müşteri iade taleplerinin ana kaydını tutar.
CREATE TABLE returns (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reason TEXT, -- Müşterinin belirttiği genel iade nedeni
    status return_status DEFAULT 'pending_approval' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_returns_order_id ON returns(order_id);
CREATE INDEX idx_returns_user_id ON returns(user_id);
CREATE INDEX idx_returns_status ON returns(status);

-- return_items: Bir iade talebinde hangi ürünlerin ve hangi miktarda iade edildiğini belirtir.
CREATE TABLE return_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    return_id BIGINT NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
    order_item_id BIGINT NOT NULL REFERENCES order_items(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    reason TEXT -- Her bir ürün için özel iade nedeni (opsiyonel)
);
CREATE INDEX idx_return_items_return_id ON return_items(return_id);


-- RLS Politikaları
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own returns."
ON returns FOR ALL USING (auth.uid() = user_id);

ALTER TABLE return_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage items in their own returns."
ON return_items FOR ALL USING (
    (SELECT user_id FROM returns WHERE id = return_id) = auth.uid()
);

``` 