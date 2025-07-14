# 📋 Gold Center - Proje Geliştirme Planı

## 🎯 Proje Genel Bakış
Gold Center, mücevherat sektörü için modern, ölçeklenebilir bir e-ticaret platformu. Proje 3 aşamalı geliştirme yaklaşımı ile WhatsApp tabanlı satışlardan tam e-ticaret çözümüne doğru ilerliyor.

## 🚀 Faz 1: MVP (Minimum Viable Product) - WhatsApp Odaklı Satış
**Süre:** 4-6 hafta  
**Hedef:** Temel ürün kataloğu ve WhatsApp ile sipariş alma

### 1.1 Proje Temel Kurulum
- [x] Next.js 14 (App Router) projesi kurulumu
- [x] TypeScript yapılandırması
- [x] Tailwind CSS kurulumu ve yapılandırması
- [x] ESLint, Prettier, Husky pre-commit hooks
- [x] Temel klasör yapısı oluşturma (`src/app`, `src/components`, `src/lib`, `src/types`)

### 1.2 Veritabanı Kurulumu
- [ ] Supabase projesi oluşturma
- [ ] PostgreSQL veritabanı şeması oluşturma
  - [ ] `categories` tablosu
  - [ ] `products` tablosu
  - [ ] `product_variants` tablosu
  - [ ] `product_images` tablosu
- [ ] Row Level Security (RLS) politikalarını uygulama
- [ ] Supabase client (`lib/db.ts`) kurulumu

### 1.3 Temel UI Bileşenleri
- [ ] Shadcn/UI kurulumu
- [ ] `cn` utility fonksiyonu (`lib/utils.ts`)
- [ ] Temel UI bileşenleri:
  - [ ] `Button.tsx`
  - [ ] `Card.tsx`
  - [ ] `Input.tsx`
  - [ ] `Badge.tsx`
  - [ ] `Skeleton.tsx`

### 1.4 Layout ve Navigasyon
- [ ] Ana layout (`app/layout.tsx`)
- [ ] Navbar bileşeni (`components/layout/Navbar.tsx`)
- [ ] Footer bileşeni (`components/layout/Footer.tsx`)
- [ ] Mobil responsive tasarım
- [ ] Logo ve brand identity entegrasyonu

### 1.5 Ürün Kataloğu
- [ ] Ürün listesi sayfası (`app/(shop)/urunler/page.tsx`)
- [ ] Ürün kartı bileşeni (`components/features/ProductCard.tsx`)
- [ ] Ürün detay sayfası (`app/(shop)/urunler/[slug]/page.tsx`)
- [ ] Ürün varyant seçimi (renk, boyut, malzeme)
- [ ] Ürün resimleri galerisi
- [ ] Fiyat formatlaması (`lib/utils.ts` içinde `formatPrice`)

### 1.6 Kategori Sistemi
- [ ] Kategori listesi sayfası (`app/(shop)/kategoriler/page.tsx`)
- [ ] Kategori detay sayfası (`app/(shop)/kategoriler/[slug]/page.tsx`)
- [ ] Kategori navigasyon menüsü
- [ ] Breadcrumb navigasyonu

### 1.7 Arama ve Filtreleme
- [ ] Temel arama işlevselliği (ILIKE kullanarak)
- [ ] Kategori filtreleme
- [ ] Fiyat aralığı filtreleme
- [ ] Sıralama seçenekleri (fiyat, popülerlik)

### 1.8 WhatsApp Entegrasyonu
- [ ] WhatsApp butonu (`components/features/WhatsAppButton.tsx`)
- [ ] Sepet durumu localStorage'da yönetimi
- [ ] WhatsApp mesaj formatlaması
- [ ] Sipariş özeti ve WhatsApp'a aktarma

### 1.9 İletişim ve Hakkında Sayfaları
- [ ] Hakkımızda sayfası (`app/(shop)/hakkimizda/page.tsx`)
- [ ] İletişim sayfası (`app/(shop)/iletisim/page.tsx`)
- [ ] Gizlilik politikası sayfası
- [ ] Kullanım koşulları sayfası

## 🎨 Faz 2: İçerik ve Kullanıcı Etkileşimi
**Süre:** 3-4 hafta  
**Hedef:** Kullanıcı hesapları, içerik yönetimi ve etkileşim özellikleri

### 2.1 Kullanıcı Kimlik Doğrulama
- [ ] Supabase Auth yapılandırması
- [ ] Giriş sayfası (`app/(auth)/giris/page.tsx`)
- [ ] Kayıt sayfası (`app/(auth)/kayit/page.tsx`)
- [ ] Şifre sıfırlama sayfası
- [ ] Profil sayfası (`app/(shop)/profil/page.tsx`)
- [ ] Kullanıcı avatarı ve profil resmi yükleme

### 2.2 Blog Sistemi
- [ ] Blog listesi sayfası (`app/(shop)/blog/page.tsx`)
- [ ] Blog detay sayfası (`app/(shop)/blog/[slug]/page.tsx`)
- [ ] Blog kategorileri
- [ ] Yönetici paneli blog editörü
- [ ] SEO meta etiketleri

### 2.3 İnceleme ve Puanlama
- [ ] Ürün incelemeleri veritabanı şeması
- [ ] İnceleme yazma formu
- [ ] İnceleme gösterimi
- [ ] Yıldız puanlama sistemi
- [ ] İnceleme moderasyonu

### 2.4 Favori Liste
- [ ] Favori ürünler veritabanı şeması
- [ ] Favori ekleme/çıkarma işlevselliği
- [ ] Favori listesi sayfası (`app/(shop)/favoriler/page.tsx`)
- [ ] Favori durumu UI gösterimi

### 2.5 Bildirim Sistemi
- [ ] E-posta bildirimleri (Resend entegrasyonu)
- [ ] Kullanıcı bildirim tercihleri
- [ ] Sipariş durumu bildirimleri
- [ ] Promosyon e-postaları

## 🛒 Faz 3: Tam E-Ticaret Çözümü
**Süre:** 6-8 hafta  
**Hedef:** Sepet, ödeme, sipariş yönetimi ve tam e-ticaret deneyimi

### 3.1 Sepet Yönetimi
- [ ] Sepet state management (Zustand)
- [ ] Sepet sayfası (`app/(shop)/sepet/page.tsx`)
- [ ] Sepet bileşeni (`components/features/Cart.tsx`)
- [ ] Sepet öğesi bileşeni
- [ ] Miktar güncelleme işlevselliği
- [ ] Sepet özeti ve toplam hesaplama

### 3.2 Ödeme Sistemi
- [ ] Stripe entegrasyonu
- [ ] Ödeme sayfası (`app/(shop)/odeme/page.tsx`)
- [ ] Kredi kartı formu
- [ ] Ödeme webhook'ları (`app/api/webhooks/stripe/route.ts`)
- [ ] Ödeme durumu yönetimi
- [ ] Güvenlik ve SSL sertifikası

### 3.3 Sipariş Yönetimi
- [ ] Sipariş veritabanı şeması
- [ ] Sipariş oluşturma işlemi
- [ ] Sipariş geçmişi sayfası (`app/(shop)/siparisler/page.tsx`)
- [ ] Sipariş detay sayfası
- [ ] Sipariş durumu takibi
- [ ] Fatura oluşturma

### 3.4 Stok Yönetimi
- [ ] Stok durumu kontrolü
- [ ] Stok azalma otomasyonu
- [ ] Düşük stok uyarıları
- [ ] Stokta yok durumu UI
- [ ] Stok rezervasyon mantığı

### 3.5 Kargo ve Teslimat
- [ ] Kargo firma entegrasyonları
- [ ] Kargo ücreti hesaplama
- [ ] Teslimat adres yönetimi
- [ ] Kargo takip entegrasyonu
- [ ] Teslimat durumu bildirimleri

### 3.6 İade ve Değişim
- [ ] İade talebi sistemi
- [ ] İade sebepleri yönetimi
- [ ] İade durumu takibi
- [ ] İade onay/red işlemleri
- [ ] İade muhasebe entegrasyonu

## 🔧 Teknik Geliştirmeler ve Optimizasyonlar

### Performance ve SEO
- [ ] Image optimization (Next.js Image component)
- [ ] Lazy loading implementasyonu
- [ ] Code splitting ve dynamic imports
- [ ] SEO meta etiketleri
- [ ] Sitemap.xml oluşturma
- [ ] Robots.txt yapılandırması
- [ ] Structured data (Schema.org)

### Güvenlik ve Testler
- [ ] Unit testler (Jest + React Testing Library)
- [ ] E2E testler (Playwright)
- [ ] Güvenlik auditleri
- [ ] CSRF koruması
- [ ] Rate limiting
- [ ] Input validation (Zod)

### Monitoring ve Analytics
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Google Analytics entegrasyonu
- [ ] Conversion tracking
- [ ] User behavior analytics

### Deployment ve DevOps
- [ ] Vercel deployment yapılandırması
- [ ] Environment variables yönetimi
- [ ] Continuous Integration/Deployment (CI/CD)
- [ ] Database migrations
- [ ] Backup stratejisi

## 🎯 Yönetici Paneli (Admin Panel)

### Ürün Yönetimi
- [ ] Ürün ekleme/düzenleme/silme
- [ ] Ürün kategorileri yönetimi
- [ ] Ürün varyantları yönetimi
- [ ] Ürün resimleri yönetimi
- [ ] Bulk operations (toplu işlemler)

### Sipariş Yönetimi
- [ ] Sipariş listesi ve filtreleme
- [ ] Sipariş detay görüntüleme
- [ ] Sipariş durumu güncelleme
- [ ] Kargo bilgileri girişi
- [ ] İade yönetimi

### Kullanıcı Yönetimi
- [ ] Kullanıcı listesi
- [ ] Kullanıcı detayları
- [ ] Kullanıcı rolü yönetimi
- [ ] Kullanıcı aktiviteleri log

### Raporlama
- [ ] Satış raporları
- [ ] Ürün performans raporları
- [ ] Kullanıcı aktivite raporları
- [ ] Stok durumu raporları

## 🌐 Çok Dilli Destek (i18n)

### Temel Hazırlık
- [ ] next-intl kurulumu
- [ ] Dil dosyaları yapılandırması
- [ ] Dil seçici bileşen
- [ ] URL yapılandırması (/tr, /en)

### İçerik Çeviri
- [ ] UI elementleri çevirisi
- [ ] Ürün açıklamaları için çoklu dil desteği
- [ ] Blog içerikleri çevirisi
- [ ] SEO meta etiketleri çevirisi

## 📱 Mobil Optimizasyon

### Responsive Design
- [ ] Mobil-first tasarım yaklaşımı
- [ ] Touch-friendly UI elementleri
- [ ] Mobil navigasyon menüsü
- [ ] Mobil ödeme optimizasyonu

### PWA Özellikleri
- [ ] Service worker implementasyonu
- [ ] Offline functionality
- [ ] Push notifications
- [ ] App manifest dosyası

---

## 🏆 Kilometre Taşları

### Milestone 1: MVP Tamamlama
- [ ] Temel ürün kataloğu çalışıyor
- [ ] WhatsApp entegrasyonu aktif
- [ ] Responsive tasarım tamamlandı
- [ ] Temel SEO optimizasyonları yapıldı

### Milestone 2: İçerik Platformu
- [ ] Kullanıcı sistemi çalışıyor
- [ ] Blog ve içerik sistemi aktif
- [ ] İnceleme sistemi çalışıyor
- [ ] E-posta bildirimleri aktif

### Milestone 3: Tam E-Ticaret
- [ ] Sepet ve ödeme sistemi çalışıyor
- [ ] Sipariş yönetimi tamamlandı
- [ ] Stok yönetimi aktif
- [ ] İade sistemi çalışıyor

### Milestone 4: Yönetici Paneli
- [ ] Tam admin panel çalışıyor
- [ ] Raporlama sistemi aktif
- [ ] Kullanıcı yönetimi tamamlandı

### Milestone 5: Uluslararası Hazırlık
- [ ] Çok dilli destek aktif
- [ ] Mobil optimizasyon tamamlandı
- [ ] PWA özellikleri aktif
- [ ] Performance optimizasyonları yapıldı

---

## 📝 Notlar

- Her milestone sonunda kapsamlı test yapılmalı
- Kod review süreci her feature için uygulanmalı
- Kullanıcı geri bildirimleri düzenli olarak toplanmalı
- Performance metrikleri sürekli izlenmeli
- Güvenlik auditleri düzenli olarak yapılmalı

**Son Güncelleme:** 2025-01-14