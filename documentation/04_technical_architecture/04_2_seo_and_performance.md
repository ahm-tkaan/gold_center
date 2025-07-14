# Teknik Mimari: SEO ve Performans Stratejileri

## 1. Genel Yaklaşım

Projemizin başarısı, sadece işlevsel olmasıyla değil, aynı zamanda potansiyel müşteriler tarafından kolayca bulunabilmesi ve onlara kusursuz bir kullanıcı deneyimi sunmasıyla ölçülür. Bu nedenle, SEO ve performans, projenin her aşamasında öncelikli olarak ele alınacaktır.

## 2. Arama Motoru Optimizasyonu (SEO)

### 2.1. Sayfa İçi SEO (On-Page SEO)

- **Metadata Yönetimi:**
    - Next.js'in yerleşik Metadata API'ı kullanılacaktır. Her sayfanın (`page.tsx`) ve layout'un (`layout.tsx`) kendine özgü, açıklayıcı bir `<title>` etiketi ve `description` meta etiketi olacaktır.
    - Ürün, kategori ve blog gibi dinamik sayfalar, bu meta etiketlerini veritabanından gelen verilerle (ürün adı, kategori açıklaması vb.) dinamik olarak oluşturacaktır.
    - **Örnek:** `<title>Pırlanta Tektaş Yüzük | Gold Center</title>`

- **Anlamlı URL Yapısı (Clean URLs):**
    - Next.js'in dosya tabanlı yönlendirme (file-based routing) sistemi sayesinde, URL'lerimiz doğal olarak okunabilir ve anahtar kelime açısından zengin olacaktır.
    - **Örnek:** `/kategori/altin-kolyeler`, `/urun/papatya-model-gumus-bileklik`

- **Anlamsal HTML (Semantic HTML):**
    - İçeriğe yapı ve anlam kazandırmak için `<h1>`, `<h2>`, `<nav>`, `<main>`, `<article>` gibi doğru HTML etiketleri kullanılacaktır. Bu, arama motorlarının sayfa yapısını daha iyi anlamasına yardımcı olur.

### 2.2. Teknik SEO

- **Site Haritası (`sitemap.xml`):**
    - Arama motorlarının sitemizdeki tüm geçerli sayfaları (ana sayfa, ürünler, kategoriler, blog yazıları) kolayca keşfedebilmesi için, Next.js'in yerleşik `generateSitemap` özelliği kullanılarak `sitemap.xml` dosyası otomatik olarak oluşturulacaktır.

- **`robots.txt`:**
    - Arama motoru botlarına hangi sayfaları tarayıp hangilerini yok saymaları gerektiğini (örneğin `/admin`, `/sepet`, `/odeme` gibi sayfaları engellemek) bildirmek için bir `robots.txt` dosyası oluşturulacaktır.

- **Yapılandırılmış Veri (Structured Data - Schema.org):**
    - Özellikle ürün detay sayfalarında, arama motorlarına ürün hakkında detaylı bilgi sunmak için `JSON-LD` formatında yapılandırılmış veriler eklenecektir. Bu, arama sonuçlarında "zengin snippet"ler (fiyat, stok durumu, puanlama gibi bilgilerin direkt görünmesi) elde etmemizi sağlar.

- **İç Linkleme (Internal Linking):**
    - Blog yazıları gibi içerik sayfalarından, ilgili ürün veya kategori sayfalarına linkler verilerek hem kullanıcıların sitede gezinmesi kolaylaştırılacak hem de sayfalar arası SEO değeri (link juice) aktarımı sağlanacaktır.

## 3. Performans Optimizasyonu

- **Render Stratejileri:**
    - Next.js App Router'ın varsayılan sunucu bileşenleri (Server Components) sayesinde hızlı ilk sayfa yükleme süreleri hedeflenmektedir.
    - Sık değişmeyen sayfalar ("Hakkımızda", "SSS", tamamlanmış blog yazıları) için Statik Site Oluşturma (SSG) kullanılarak sayfaların build anında bir kere oluşturulup CDN'den servis edilmesi sağlanacaktır.

- **Resim Optimizasyonu:**
    - Projedeki tüm resimler için Next.js'in yerleşik `<Image>` bileşeni kullanılacaktır. Bu bileşen, resimleri otomatik olarak modern formatlara (WebP gibi) çevirir, doğru boyutlandırır ve "lazy loading" (tembel yükleme) yaparak sayfa açılış hızını önemli ölçüde artırır.

- **Kod Ayrıştırma (Code Splitting):**
    - Next.js, her sayfayı kendi JavaScript paketine ayırır, böylece kullanıcılar sadece ziyaret ettikleri sayfa için gerekli kodu indirir. Bu yapıyı korumak adına, ilk yüklemede gerekmeyen büyük ve interaktif bileşenler (örneğin karmaşık bir filtreleme modal'ı) için `next/dynamic` ile dinamik `import` kullanılacaktır.

- **Önbellekleme (Caching):**
    - **Veri Önbellekleme:** Sunucudan gelen ve sık değişmeyen veriler (kategoriler gibi) için Next.js'in `fetch` API'ının önbellekleme yetenekleri kullanılacaktır. Client-side'da ise TanStack Query, verileri önbelleğe alarak gereksiz API isteklerini önleyecektir.
    - **CDN Önbellekleme:** Proje Vercel üzerinde deploy edildiğinde, statik asset'ler ve SSG ile oluşturulmuş sayfalar otomatik olarak Vercel'in global CDN'inde önbelleğe alınarak dünyanın her yerinden hızlı erişim sağlanacaktır.

- **Paket Boyutu Analizi:**
    - Proje bağımlılıklarının toplam boyutunu kontrol altında tutmak için periyodik olarak `@next/bundle-analyzer` paketi kullanılacaktır. Bu araç, hangi kütüphanenin ne kadar yer kapladığını görselleştirerek gereksiz yere büyük olan bağımlılıkları tespit etmemize yardımcı olacaktır. 