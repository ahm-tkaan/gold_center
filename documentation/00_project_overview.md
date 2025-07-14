# Gold Center - E-Ticaret Projesi Genel Bakış

## 1. Proje Vizyonu
Kuyumculuk ve takı sektörü için, başlangıçta WhatsApp üzerinden satış odaklı, ilerleyen fazlarda ise tam kapsamlı bir e-ticaret deneyimi sunacak modern, ölçeklenebilir ve kullanıcı dostu bir platform oluşturmak. Bu doküman, projenin teknik ve işlevsel mimarisini, standartlarını ve yol haritasını tanımlar.

## 2. Dokümantasyon Dizini
Bu proje, aşağıdaki dokümanlarda detaylandırılan modüler bir yapıya sahiptir:

- **Veritabanı Mimarisi (`/01_database_schema`)**
  - [`01_1_schema_overview.md`](./01_database_schema/01_1_schema_overview.md): Tüm veritabanı şemasına kuş bakışı ve ERD diyagramı.
  - [`01_2_products_and_variants.md`](./01_database_schema/01_2_products_and_variants.md): Ürünler, varyantlar, nitelikler ve envanter tabloları.
  - [`01_3_users_and_profiles.md`](./01_database_schema/01_3_users_and_profiles.md): Kullanıcılar, profiller ve adres yönetimi.
  - [`01_4_orders_and_payments.md`](./01_database_schema/01_4_orders_and_payments.md): Siparişler, ödemeler ve kargo takibi.
  - [`01_5_content_and_engagement.md`](./01_database_schema/01_5_content_and_engagement.md): Kategoriler, yorumlar, favoriler ve blog içerikleri.

- **Kullanıcı Akışları (`/02_user_flows`)**
  - [`02_1_authentication_flow.md`](./02_user_flows/02_1_authentication_flow.md): Kayıt, giriş ve kullanıcı hesabı yönetimi akışları.
  - [`02_2_shopping_flow.md`](./02_user_flows/02_2_shopping_flow.md): Ürün keşfi, arama, filtreleme ve ürün detaylarını görüntüleme.
  - [`02_3_checkout_flow.md`](./02_user_flows/02_3_checkout_flow.md): Sepet, adres seçimi, ödeme ve sipariş tamamlama akışı.
  - [`02_4_post_purchase_flow.md`](./02_user_flows/02_4_post_purchase_flow.md): Sipariş geçmişi, kargo takibi ve iade talebi.

- **İş Mantığı (`/03_business_logic`)**
  - [`03_1_inventory_management.md`](./03_business_logic/03_1_inventory_management.md): Stok yönetimi ve güncelleme kuralları.
  - [`03_2_shipping_and_logistics.md`](./03_business_logic/03_2_shipping_and_logistics.md): Kargo ücreti hesaplama ve entegrasyon stratejisi.
  - [`03_3_returns_and_refunds.md`](./03_business_logic/03_3_returns_and_refunds.md): İade ve geri ödeme süreçleri (RMA).
  - [`03_4_search_strategy.md`](./03_business_logic/03_4_search_strategy.md): Arama fonksiyonunun aşamalı geliştirme planı.

- **Teknik Mimari (`/04_technical_architecture`)**
  - [`04_1_tech_stack.md`](./04_technical_architecture/04_1_tech_stack.md): Kullanılan teknolojiler ve gerekçeleri.
  - [`04_2_seo_and_performance.md`](./04_technical_architecture/04_2_seo_and_performance.md): SEO, performans ve önbellekleme stratejileri.
  - [`04_3_i18n_strategy.md`](./04_technical_architecture/04_3_i18n_strategy.md): Uluslararasılaşma ve yerelleştirme planı.

## 3. Sayfa Yapısı
```
/                    - Ana sayfa (Öne çıkan ürünler, slider)
/urunler             - Tüm ürünlerin listelendiği sayfa (PLP)
/urunler?q=[term]    - Arama sonuçları sayfası
/kategori/[slug]     - Kategoriye ait ürünlerin listelendiği sayfa
/urun/[slug]         - Ürün detay sayfası (PDP)
/sepet               - Alışveriş sepeti
/odeme               - Ödeme sayfası (Adres, kargo, ödeme bilgileri)
/hesabim/*           - Kullanıcı hesap sayfaları (Profiller, Siparişler, Favoriler)
/blog                - Blog yazılarının listesi
/blog/[slug]         - Blog yazı detayı
/hakkimizda          - Kurumsal sayfa
/iletisim            - İletişim sayfası
/admin/*             - Yönetim paneli
```

## 4. Geliştirme Aşamaları (Roadmap)

### Faz 1 - MVP (Minimum Viable Product)
- [ ] Temel Next.js projesinin kurulması ve Vercel'e deploy edilmesi.
- [ ] Supabase projesinin oluşturulması ve entegrasyonu.
- [ ] Veritabanı şemasının ilk halinin (ürünler, kategoriler) uygulanması.
- [ ] Ürün kataloğu, kategori ve ürün detay sayfalarının oluşturulması.
- [ ] Temel ürün yönetimi için Admin Paneli (CRUD).
- [ ] WhatsApp ile sipariş vermek için yönlendirme entegrasyonu.
- [ ] Kayıt olmadan favorilere ekleme (Local Storage).

### Faz 2 - İçerik ve Kullanıcı Etkileşimi
- [ ] Blog ve içerik yönetim sisteminin kurulması.
- [ ] Müşteri yorumları sisteminin eklenmesi.
- [ ] Gelişmiş ürün filtreleme (fiyat, özellik vb.) ve sıralama.
- [ ] Temel SEO optimizasyonlarının yapılması (Meta tag'ler, sitemap).
- [ ] Kullanıcı kayıt ve giriş sisteminin (Supabase Auth) entegrasyonu.
- [ ] Kayıtlı kullanıcılar için favori listesi (veritabanı destekli).

### Faz 3 - Tam E-Ticaret
- [ ] Alışveriş sepeti ve ödeme altyapısının (Stripe) entegrasyonu.
- [ ] Sipariş yönetimi (orders, order_items tabloları).
- [ ] Kullanıcı hesap sayfaları (siparişlerim, adreslerim vb.).
- [ ] Kargo ve iade yönetimi altyapısı.
- [ ] E-posta servislerinin (Resend) entegrasyonu (sipariş onayı, şifre sıfırlama vb.).
- [ ] Gelişmiş admin paneli özellikleri (analitik, toplu işlemler). 