# Veritabanı Şeması: İçerik ve Kullanıcı Etkileşimi

## 1. Mimarinin Mantığı

Bu doküman, doğrudan satış hunisi dışında kalan ancak kullanıcı deneyimini zenginleştiren, site trafiğini artıran ve müşteri sadakati oluşturan özellikleri destekleyen tabloları tanımlar.

- **`categories`**: Ürünleri hiyerarşik bir yapıda (ana kategori -> alt kategori) organize etmek için kullanılır. `parent_id` alanı, bir kategorinin başka bir kategoriye bağlanmasını sağlayarak bu yapıyı oluşturur.
- **`reviews`**: Kullanıcıların ürünlere yorum yapmasını ve 1-5 arası puan vermesini sağlar. Her yorum, bir yönetici tarafından onaylandıktan sonra sitede görünecek şekilde bir `status` alanı içerir.
- **`wishlists` ve `wishlist_items`**: Kayıtlı kullanıcıların beğendikleri ürünleri daha sonra bulmak için kaydedebilecekleri bir "Favori Listesi" (veya "İstek Listesi") oluşturur. `wishlists` ana listeyi tanımlarken, `wishlist_items` bu listeye eklenen ürün varyantlarını tutar.
- **`posts`**: SEO ve içerik pazarlaması amacıyla blog yazıları, haberler veya bakım rehberleri gibi içeriklerin yönetilmesi için kullanılır.

## 2. SQL Tablo Tanımları

```sql
-- categories: Ürünler için hiyerarşik kategori yapısını tanımlar.
CREATE TABLE categories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    parent_id BIGINT REFERENCES categories(id) ON DELETE SET NULL, -- Alt kategori için ana kategori referansı
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);


-- Yorum durumlarını yönetmek için ENUM tipi.
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');

-- reviews: Kullanıcıların ürünler için yaptığı yorum ve puanlamaları saklar.
CREATE TABLE reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status review_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_reviews_product_id_user_id ON reviews(product_id, user_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- RLS Politikaları
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews." ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can manage their own reviews." ON reviews FOR ALL USING (auth.uid() = user_id);


-- wishlists: Her kullanıcı için bir veya daha fazla favori listesi oluşturur.
CREATE TABLE wishlists (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'Favorilerim', -- 'Yazlık Alışverişi' gibi özel listeler de olabilir.
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX idx_wishlists_user_id_name ON wishlists(user_id, name);

-- wishlist_items: Bir favori listesine eklenen ürün varyantlarını tutar.
CREATE TABLE wishlist_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    variant_id BIGINT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(wishlist_id, variant_id)
);

-- RLS Politikaları
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own wishlists." ON wishlists FOR ALL USING (auth.uid() = user_id);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage items in their own wishlists." ON wishlist_items FOR ALL USING (
    (SELECT user_id FROM wishlists WHERE id = wishlist_id) = auth.uid()
);


-- posts: Blog, haberler gibi içerikleri yönetir.
CREATE TABLE posts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content JSONB, -- Zengin metin içeriği için
    excerpt TEXT,
    cover_image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_posts_slug ON posts(slug);

``` 