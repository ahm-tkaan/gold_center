# Veritabanı Şeması: Ürünler, Varyantlar ve Envanter

## 1. Mimarinin Mantığı

Bu platformdaki ürün yapısı, bir ana ürüne bağlı birden çok satılabilir varyantın oluşturulmasına olanak tanır. Örneğin, "Zarif Gümüş Kolye" bir ana ürün iken, bu kolyenin "45cm zincir" ve "50cm zincir" seçenekleri ayrı birer **varyanttır**. Her varyantın kendine ait bir stok kodu (SKU), fiyatı, stok miktarı ve görselleri olabilir.

Bu yapının temel bileşenleri şunlardır:
- **`products`**: Tüm varyantlar için ortak olan temel bilgileri içerir (ürün adı, genel açıklama, kategori).
- **`attributes`**: Bir ürünün sahip olabileceği özellikleri tanımlar (örn: "Renk", "Zincir Uzunluğu", "Yüzük Ölçüsü").
- **`attribute_values`**: Bu özelliklerin alabileceği spesifik değerleri tutar (örn: "Gümüş", "Altın", "45cm", "12 Numara").
- **`product_variants`**: Asıl satılabilir birimi temsil eder. Bir ürünün belirli bir özellik kombinasyonudur (örn: "Gümüş Renk, 45cm Zincir Uzunluğunda Zarif Kolye"). Her varyantın kendi SKU'su, fiyatı ve envanteri bulunur.
- **`product_variant_attributes`**: Hangi varyantın hangi özellik değerine sahip olduğunu bağlayan tablodur.
- **`product_images`**: Görsellerin hem ana ürüne hem de spesifik bir varyanta (örn: sadece altın renkli ürünün resmi) bağlanabilmesini sağlar.

## 2. Stok Kodu (SKU) Stratejisi

Doğru bir SKU yapısı, envanter takibi için hayati öneme sahiptir. Aşağıdaki gibi basit ve anlamlı bir yapı önerilmektedir:
`[ANA_URUN_KISALTMA]-[OZELLIK1_DEGER_KISALTMA]-[OZELLIK2_DEGER_KISALTMA]`
**Örnek:**
- Ana Ürün: "Zarif Gümüş Kolye" (SKU: ZGK)
- Varyant 1: Renk: Gümüş (GMS), Uzunluk: 45cm (45) -> **SKU: ZGK-GMS-45**
- Varyant 2: Renk: Altın (ALT), Uzunluk: 50cm (50) -> **SKU: ZGK-ALT-50**

## 3. SQL Tablo Tanımları

```sql
-- products: Tüm varyantlar için ortak olan ana ürün bilgilerini saklar.
CREATE TABLE products (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description JSONB, -- Farklı diller veya detaylı açıklamalar için JSONB
    base_sku TEXT, -- Varyant SKU'ları için temel. Örn: "ZGK"
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);

-- attributes: Ürünlere atanabilecek özellikleri tanımlar (Renk, Boyut vb.).
CREATE TABLE attributes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE -- Örn: 'Renk'
);

-- attribute_values: Özelliklerin alabileceği değerleri saklar (Kırmızı, Mavi vb.).
CREATE TABLE attribute_values (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    attribute_id BIGINT NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    value TEXT NOT NULL, -- Örn: 'Altın'
    slug TEXT NOT NULL, -- Örn: 'altin'
    UNIQUE(attribute_id, value)
);
CREATE INDEX idx_attribute_values_attribute_id ON attribute_values(attribute_id);


-- product_variants: Satılabilir her bir ürün varyasyonunu temsil eder.
CREATE TABLE product_variants (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL UNIQUE,
    price_in_cents INT NOT NULL, -- Kuruş olarak saklamak matematiksel hataları önler.
    stock_quantity INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);


-- product_variant_attributes: Varyantları özellik değerleriyle birleştirir.
-- Bir varyantın birden çok özelliği olabilir (örn: hem renk hem boyut).
CREATE TABLE product_variant_attributes (
    variant_id BIGINT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    attribute_value_id BIGINT NOT NULL REFERENCES attribute_values(id) ON DELETE CASCADE,
    PRIMARY KEY (variant_id, attribute_value_id)
);

-- product_images: Ürün ve varyant görsellerini yönetir.
CREATE TABLE product_images (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE, -- Null olabilir, ana ürün resmiyse.
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_variant_id ON product_images(variant_id);

``` 