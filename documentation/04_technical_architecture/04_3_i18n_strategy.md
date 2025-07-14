# Teknik Mimari: Uluslararasılaşma (i18n) Stratejisi

## 1. Genel Yaklaşım

Bu proje, başlangıçta Türkiye pazarı için Türkçe olarak geliştirilecek olsa da, mimarisi gelecekte potansiyel olarak yeni dilleri (örn: İngilizce, Arapça) ve para birimlerini destekleyecek şekilde esnek ve ölçeklenebilir olarak tasarlanmalıdır. Uluslararasılaşma (Internationalization - i18n), bu hazırlık sürecini ifade eder.

Bu strateji, gelecekteki yerelleştirme (Localization - l10n) çalışmalarının temelini atacaktır.

## 2. Stratejinin Ana Bileşenleri

### 2.1. Arayüz Metinlerinin Çevirisi (UI Translations)

Kullanıcı arayüzünde yer alan statik metinlerin (butonlar, etiketler, menüler vb.) çevirisi için bir i18n kütüphanesi kullanılacaktır.

- **Seçilecek Teknoloji:** `next-intl`. Next.js App Router ile uyumluluğu ve zengin özellik seti nedeniyle tercih edilmektedir.
- **Uygulama Mantığı:**
    1. Arayüzdeki metinler ("Sepete Ekle", "Giriş Yap" vb.) doğrudan koda yazılmayacaktır.
    2. Bunun yerine, dil bazında ayrılmış JSON dosyalarında bir anahtar-değer (key-value) yapısıyla saklanacaktır.
        - `messages/tr.json` -> `{ "addToCart": "Sepete Ekle" }`
        - `messages/en.json` -> `{ "addToCart": "Add to Cart" }`
    3. `next-intl` kütüphanesinin sağladığı `useTranslations` hook'u ile ilgili sayfada veya bileşende doğru çeviri çağrılacaktır: `const t = useTranslations('ProductPage'); t('addToCart');`
    4. URL yapısı, aktif olan dili içerecek şekilde düzenlenecektir. Bu, hem kullanıcılar hem de SEO için en iyi yaklaşımdır.
        - `https://.../tr/urunler/altin-yuzuk`
        - `https://.../en/products/gold-ring`

### 2.2. Veritabanı İçeriğinin Çevirisi (Dynamic Content)

Ürün isimleri, açıklamaları, kategori adları ve blog yazıları gibi dinamik içeriklerin de birden çok dilde saklanabilmesi gerekir.

- **Teknik Yaklaşım:** PostgreSQL'in `JSONB` veri tipi kullanılacaktır.
- **Uygulama Mantığı:**
    - `products` tablosundaki `name` sütunu, `TEXT` yerine `JSONB` tipinde olacaktır.
    - Veri, dil kodlarını anahtar olarak içeren bir JSON objesi olarak saklanacaktır:
      ```json
      {
        "tr": "Zarif Gümüş Kolye",
        "en": "Elegant Silver Necklace"
      }
      ```
    - Arka uç (backend), API isteğinde belirtilen dil koduna göre bu JSONB objesinden ilgili çeviriyi seçip gönderecektir.
    - Bu yaklaşım, başlangıç için basit ve etkilidir. Çok sayıda dil veya çeviri üzerinde karmaşık sorgu gereksinimleri olursa, gelecekte `product_translations` gibi ayrı bir çeviri tablosu oluşturma stratejisi de değerlendirilebilir.

### 2.3. Sayı, Tarih ve Para Birimi Formatlama

Farklı bölgelerin sayı, tarih ve para birimi formatları farklıdır.

- **Teknik Yaklaşım:** Bu formatlama işlemleri için, tüm modern tarayıcılarda yerleşik olarak bulunan standart `Intl` API'ı kullanılacaktır. `next-intl` bu API için kolaylaştırıcı sarmalayıcılar (wrappers) sunar.
- **Uygulama Mantığı:**
    - **Para Birimi:** Fiyatlar, matematiksel hataları önlemek için veritabanında her zaman en küçük birimde (örn: kuruş) ve `INTEGER` olarak saklanmalıdır.
      - `price_in_cents = 29999`
      - Gösterim: `new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(299.99)` -> **"299,99 ₺"**
      - Gösterim: `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(15.99)` -> **"$15.99"**
    - **Tarihler:** Tarih formatları da benzer şekilde `Intl.DateTimeFormat` ile kullanıcının diline göre formatlanacaktır.

Bu strateji, projenin kod tabanını gelecekteki uluslararası genişlemelere en başından hazır hale getirir ve sonradan yapılacak masraflı ve karmaşık yeniden yapılandırma (refactoring) ihtiyacını ortadan kaldırır. 