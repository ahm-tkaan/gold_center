# Veritabanı Şemasına Genel Bakış

## 1. Mantıksal Veri Modeli (ERD)
Aşağıdaki diyagram, e-ticaret platformumuzun temel varlıkları (entity) ve aralarındaki ilişkileri göstermektedir. Bu, projenin tam kapsamlı hali (Faz 3) düşünülerek tasarlanmıştır.

```mermaid
erDiagram
    users ||--o{ orders : places
    users ||--o{ addresses : has
    users ||--o{ reviews : writes
    users ||--o{ wishlists : has
    
    products ||--|{ product_variants : has
    products ||--o{ reviews : "is reviewed on"
    products }o--|| categories : belongs to

    product_variants ||--o{ wishlist_items : "is in"
    product_variants ||--o{ order_items : "is part of"
    product_variants }o--|| product_variant_attributes : has

    attributes ||--|{ attribute_values : contains
    attribute_values ||--o{ product_variant_attributes : "is assigned to"

    orders ||--|{ order_items : contains
    orders ||--o{ shipments : "has"
    orders }o--|| addresses : "ships to"

    wishlists ||--|{ wishlist_items : contains

    posts }o--|| users : "is written by"

```

## 2. Tablo Listesi ve Açıklamaları
Aşağıda, veritabanında yer alacak olan tüm tabloların bir listesi ve kısa açıklamaları bulunmaktadır.

| Tablo Adı                    | Açıklama                                                                                                     | İlişkili Doküman                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `users` (Supabase Auth)      | Kimlik doğrulama bilgilerini (email, şifre vb.) tutan Supabase'in yerleşik tablosu.                             | [`01_3_users_and_profiles.md`](./01_3_users_and_profiles.md)                       |
| `profiles`                   | `users` tablosunu genişleten, genel kullanıcı bilgilerini (isim, avatar vb.) tutan tablo.                      | [`01_3_users_and_profiles.md`](./01_3_users_and_profiles.md)                       |
| `addresses`                  | Kullanıcıların kargo ve fatura adreslerini saklar.                                                           | [`01_3_users_and_profiles.md`](./01_3_users_and_profiles.md)                       |
| `categories`                 | Ürünlerin sınıflandırıldığı hiyerarşik kategorileri tanımlar.                                                | [`01_5_content_and_engagement.md`](./01_5_content_and_engagement.md)             |
| `products`                   | Varyantlardan bağımsız, tüm ürünlerin temel bilgilerini (isim, açıklama, kategori) içerir.                  | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `attributes`                 | Ürün özelliklerini tanımlar (ör: Renk, Boyut, Malzeme).                                                      | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `attribute_values`           | Özelliklerin alabileceği değerleri saklar (ör: Altın, Gümüş, 16cm).                                           | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `product_variants`           | Bir ürünün belirli bir varyasyonunu (ör: Altın renkli, 16cm boyutlu kolye) SKU, fiyat ve stok ile temsil eder. | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `product_variant_attributes` | Bir varyantın hangi özellik değerlerine sahip olduğunu belirten birleştirme tablosu.                            | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `product_images`             | Ürünlere ve varyantlara ait görselleri saklar.                                                               | [`01_2_products_and_variants.md`](./01_2_products_and_variants.md)               |
| `orders`                     | Müşteri siparişlerinin genel bilgilerini (sipariş durumu, toplam tutar, adres) içerir.                         | [`01_4_orders_and_payments.md`](./01_4_orders_and_payments.md)                   |
| `order_items`                | Bir siparişteki her bir ürün varyantını ve miktarını ayrı ayrı tutar.                                         | [`01_4_orders_and_payments.md`](./01_4_orders_and_payments.md)                   |
| `shipments`                  | Siparişlerin kargo bilgilerini ve takip numarasını saklar.                                                   | [`01_4_orders_and_payments.md`](./01_4_orders_and_payments.md)                   |
| `reviews`                    | Müşterilerin ürünler hakkında yazdığı yorumları ve verdiği puanları saklar.                                   | [`01_5_content_and_engagement.md`](./01_5_content_and_engagement.md)             |
| `wishlists`                  | Her kullanıcı için bir favori listesi başlığı oluşturur.                                                      | [`01_5_content_and_engagement.md`](./01_5_content_and_engagement.md)             |
| `wishlist_items`             | Bir favori listesine eklenen ürün varyantlarını saklar.                                                       | [`01_5_content_and_engagement.md`](./01_5_content_and_engagement.md)             |
| `posts`                      | Blog/Haberler bölümü için yazılan makaleleri içerir.                                                         | [`01_5_content_and_engagement.md`](./01_5_content_and_engagement.md)             | 