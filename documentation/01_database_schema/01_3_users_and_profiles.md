# Veritabanı Şeması: Kullanıcılar, Profiller ve Adresler

## 1. Mimarinin Mantığı

Kullanıcı yönetimi için Supabase'in yerleşik Kimlik Doğrulama (Auth) sistemini kullanacağız. Bu sistem, güvenlik, email doğrulaması, şifre sıfırlama gibi karmaşık işlevleri bizim için hazır olarak yönetir.

- **`auth.users` Tablosu:** Bu tablo Supabase tarafından otomatik olarak yönetilir ve `id (UUID)`, `email`, `encrypted_password` gibi hassas ve özel kimlik doğrulama verilerini içerir. Biz bu tabloya doğrudan müdahale etmeyeceğiz, sadece Supabase client kütüphaneleri aracılığıyla erişeceğiz.

- **`profiles` Tablosu:** `auth.users` tablosundaki her kullanıcı için, uygulamaya özel ve herkes tarafından görülebilir (public) bilgileri saklamak amacıyla bir `profiles` tablosu oluşturacağız. Bu tablo, `auth.users` ile bire-bir (one-to-one) ilişkiye sahip olacak ve kullanıcının adı, soyadı, avatar URL'si gibi verileri tutacaktır. Bu yaklaşım, hassas verilerle genel verileri birbirinden ayırarak güvenliği artırır.

- **`addresses` Tablosu:** Kullanıcıların birden fazla kargo veya fatura adresi kaydedebilmesi için bu tabloyu kullanacağız. Her adres, bir kullanıcıya ait olacaktır (one-to-many).

## 2. Otomatik Profil Oluşturma

Yeni bir kullanıcı Supabase Auth üzerinden kaydolduğunda, `profiles` tablosunda otomatik olarak o kullanıcı için bir satır oluşturmamız gerekir. Bu, PostgreSQL'in `trigger` (tetikleyici) fonksiyonları ile veritabanı seviyesinde verimli bir şekilde yapılabilir.

## 3. SQL Tablo Tanımları

```sql
-- profiles: auth.users tablosunu public verilerle genişletir.
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    phone_number TEXT,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security (RLS) Politikaları:
-- Kullanıcıların sadece kendi profillerini görebilmesini ve düzenleyebilmesini sağlar.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
ON profiles FOR UPDATE USING (auth.uid() = id);


-- Yeni kullanıcı kaydolduğunda profiles tablosuna otomatik kayıt ekleyen fonksiyon.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Her yeni kullanıcı kaydında yukarıdaki fonksiyonu çalıştıran tetikleyici.
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- addresses: Kullanıcıların teslimat ve fatura adreslerini saklar.
CREATE TABLE addresses (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    address_type TEXT, -- 'shipping' veya 'billing' gibi
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    postal_code TEXT,
    country TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);

-- RLS Politikaları
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own addresses."
ON addresses FOR ALL USING (auth.uid() = user_id);

``` 