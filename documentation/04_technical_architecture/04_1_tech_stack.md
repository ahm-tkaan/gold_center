# Teknik Mimari: Teknoloji Stack'i ve Gerekçeleri

## 1. Felsefemiz

Bu proje için teknoloji seçimi yapılırken aşağıdaki prensipler göz önünde bulundurulmuştur:
- **Geliştirici Verimliliği:** Hızlı, modern ve iyi dokümante edilmiş araçlar kullanarak geliştirme sürecini hızlandırmak.
- **Performans ve Ölçeklenebilirlik:** Hem son kullanıcı için hızlı bir deneyim sunmak hem de proje büyüdükçe artan yüke cevap verebilecek bir altyapı kurmak.
- **Sürdürülebilirlik ve Bakım Kolaylığı:** Topluluk desteği yüksek, standartlara uygun ve bakımı kolay teknolojiler tercih etmek.
- **Maliyet Etkinliği:** Özellikle projenin başlangıç fazlarında, ücretsiz veya maliyeti düşük, ancak kaliteden ödün vermeyen çözümler kullanmak.

## 2. Seçilen Teknolojiler

### Core Framework
- **Next.js (App Router):** Full-stack React framework'ü.
  - **Gerekçe:** Sunucu tarafında render (SSR) ve statik site oluşturma (SSG) yetenekleri sayesinde yüksek performans ve SEO uyumluluğu sağlar. React Server Components (RSC) mimarisi ile daha verimli ve modern bir geliştirme deneyimi sunar.
- **React:** Kullanıcı arayüzü (UI) kütüphanesi.
  - **Gerekçe:** Geniş ekosistemi, bileşen (component) bazlı mimarisi ve topluluk desteği ile modern web uygulamaları için endüstri standardıdır.
- **TypeScript:** JavaScript için tip güvenliği.
  - **Gerekçe:** Büyük projelerde hataları derleme aşamasında yakalayarak kod kalitesini artırır, sürdürülebilirliği ve bakım kolaylığını sağlar.

### Backend & Veritabanı
- **Supabase:** Backend-as-a-Service (BaaS) platformu.
  - **Gerekçe:** PostgreSQL veritabanı, kimlik doğrulama (Auth), dosya depolama (Storage) ve sunucusuz fonksiyonlar (Edge Functions) gibi birçok ihtiyacı tek bir platformda, cömert bir ücretsiz başlangıç paketiyle sunar. Bu, geliştirme sürecini inanılmaz hızlandırır.

### Styling
- **Tailwind CSS:** Utility-first CSS framework'ü.
  - **Gerekçe:** Önceden tanımlanmış "utility" sınıfları ile doğrudan HTML içinde hızlı ve tutarlı bir şekilde stil oluşturmayı sağlar. Yüksek oranda özelleştirilebilir ve son pakete sadece kullanılan stilleri dahil ettiği için çok performanslıdır.

### State Management
- **Zustand:** Basit ve hafif client-state yönetimi.
  - **Gerekçe:** Minimalist API'ı ve basit kullanımı ile temalar (açık/koyu mod), sepet durumu gibi global client-side state'leri yönetmek için idealdir.
- **TanStack Query (React Query):** Server-state yönetimi.
  - **Gerekçe:** Sunucudan gelen verileri (ürünler, siparişler vb.) yönetmek, önbelleğe almak (caching), geçersiz kılmak (invalidation) ve senkronize etmek için endüstri standardıdır. Karmaşık `loading` ve `error` durumlarını yönetmeyi çok kolaylaştırır.

### UI Bileşenleri
- **Shadcn/UI:** Yeniden kullanılabilir bileşen seti.
  - **Gerekçe:** Headless (mantığı stil'den ayrılmış) ve erişilebilirlik odaklı **Radix UI** üzerine inşa edilmiştir. Hazır bir kütüphane kurmak yerine, ihtiyaç duyulan bileşenlerin kodunu doğrudan projeye kopyalama felsefesine dayanır. Bu, tam kontrol ve özelleştirme imkanı sunar.

### Formlar ve Validasyon
- **React Hook Form:** Performanslı form yönetimi.
- **Zod:** Şema tabanlı validasyon.
  - **Gerekçe (İkili):** Bu ikili, en performanslı ve esnek form yönetim çözümlerinden birini sunar. Zod ile oluşturulan veri şemaları, hem client-side (tarayıcı) hem de server-side (sunucu) veri doğrulamasını tek bir kaynaktan yapmayı sağlar.

### Servisler ve Entegrasyonlar
- **Stripe:** Ödeme işlemleri.
- **Resend:** Transactional e-posta gönderimi (sipariş onayı, şifre sıfırlama vb.).
- **WhatsApp Business API:** Müşteri iletişimi (MVP için).
  - **Gerekçe:** Her biri kendi alanında lider, geliştirici dostu API'lar sunan ve güvenilirliği kanıtlanmış servislerdir.

### Geliştirme Araçları ve Test
- **ESLint & Prettier:** Kod kalitesi ve formatlama.
- **Husky:** Git hook'ları ile otomatik kod kontrolleri.
- **Jest & React Testing Library:** Birim (unit) ve bileşen (component) testleri.
- **Playwright (veya Cypress):** Uçtan uca (End-to-End) testler.
  - **Gerekçe:** Kod kalitesini en üst düzeyde tutmak ve hataları üretim ortamına taşımadan önce otomatik olarak yakalamak için kapsamlı bir test ve linting stratejisi oluşturur.

### Deployment (Dağıtım)
- **Vercel:** Hosting ve CI/CD platformu.
  - **Gerekçe:** Next.js'in geliştiricisi olan Vercel tarafından sunulur, bu nedenle mükemmel bir entegrasyon ve dağıtım deneyimi sağlar. Otomatik CI/CD, global CDN ve sunucusuz fonksiyon desteği ile modern web uygulamaları için ideal bir platformdur. 