# Kullanıcı Akışı: Ödeme Süreci (Checkout)

## 1. Genel Bakış ve Sepet Yönetimi

Bu doküman, bir kullanıcının sepet yönetimi, adres ve ödeme bilgilerini girerek siparişi tamamlama adımlarını içerir.

**Sepet (Cart) Mantığı:**
Sepet yönetimi, kullanıcı deneyiminin kesintisiz olması için client-side (tarayıcı tabanlı) olarak gerçekleştirilecektir.
- **Depolama:** Sepetteki ürünler, state management kütüphanemiz (Zustand) içinde tutulacak ve sayfa yenilendiğinde kaybolmaması için tarayıcının `localStorage`'ına kaydedilecektir.
- **Veritabanı Etkileşimi:** Sepet bilgileri, sadece kullanıcı "Siparişi Tamamla" butonuna basıp ödeme işlemini başlattığında veritabanındaki `orders` tablosuna yazılacaktır. Bu, veritabanında gereksiz ve tamamlanmamış sepet kayıtları tutmanın önüne geçer.

## 2. Sepet İşlemleri

| Adım | Aksiyon                                                                   | Teknik Uygulama                                                                                                     | Sonuç                                                                                                    |
| :--- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| 1    | Kullanıcı, PDP'de bir varyant ve miktar seçip "Sepete Ekle" butonuna tıklar. | `onClick` eventi, seçili `variant_id` ve `quantity` ile birlikte global Zustand store'daki `addToCart` fonksiyonunu tetikler. | Kullanıcıya "Ürün sepete eklendi" bildirimi (toast) gösterilir. Header'daki sepet ikonu güncellenir.     |
| 2    | Kullanıcı, sepet ikonuna tıklayarak sepet sayfasına gider.                 | Link -> `/sepet`                                                                                                    | Kullanıcı, sepet içeriğini detaylı görebileceği `/sepet` sayfasına yönlendirilir.                        |
| 3    | Kullanıcı, sepet sayfasında ürün miktarını değiştirir veya ürünü siler.   | Miktar artırma/azaltma butonları (`updateQuantity`) veya silme ikonu (`removeFromCart`) Zustand store'daki fonksiyonları çağırır. | Sepet içeriği ve ara toplam anında güncellenir.                                                          |

## 3. Ödeme Adımları

**Amaç:** Kullanıcıyı adım adım yönlendirerek ödeme sürecini olabildiğince basit ve hızlı tamamlamasını sağlamak. Bu adımlar genellikle `/odeme` sayfasında tek bir akış içinde gösterilir.

### Adım 1: Teslimat Adresi

| Kullanıcı Tipi | Aksiyon                                                                    | Teknik Uygulama                                                                         |
| :------------- | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **Giriş Yapmış** | Kullanıcıya kayıtlı adresleri listelenir ve birini seçmesi istenir.        | `addresses` tablosundan `user_id`'ye göre adresler çekilir.                             |
| **Giriş Yapmış** | Kullanıcı, "Yeni Adres Ekle" seçeneği ile yeni bir adres formu açabilir.    | Yeni adres, `addresses` tablosuna `user_id` ile birlikte kaydedilir.                  |
| **Misafir**      | Kullanıcıdan teslimat adresi bilgilerini girmesi için bir form gösterilir. | Form verileri, sipariş tamamlanana kadar state içinde tutulur.                          |

### Adım 2: Kargo Seçimi

| Adım | Aksiyon                                                              | Teknik Uygulama                                                                  | Sonuç                                                          |
| :--- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| 1    | Girilen adrese göre uygun kargo seçenekleri ve ücretleri listelenir. | Kargo ücreti hesaplama mantığı (bkz: `03_2_shipping_and_logistics.md`) çalıştırılır. | Kullanıcıya "Standart Kargo: 25.00 TL" gibi seçenekler sunulur. |
| 2    | Kullanıcı bir kargo metodu seçer.                                    | Seçim, sipariş özetindeki "Kargo Ücreti" ve "Genel Toplam" alanlarını günceller.   | Kullanıcı, ödeyeceği net tutarı görür.                         |

### Adım 3: Ödeme Bilgileri ve Sipariş Onayı

| Adım | Aksiyon                                                                   | Teknik Uygulama                                                                                                                                                                                             | Yönlendirme / Sonuç                                                                                                     |
| :--- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| 1    | Kullanıcıya nihai sipariş özeti (ürünler, kargo, toplam tutar) gösterilir.    | -                                                                                                                                                                                                           | Kullanıcı, ödeme yapmadan önce son bir kez siparişini kontrol eder.                                                     |
| 2    | Sayfaya Stripe'ın ödeme formu (Payment Element) yerleştirilir.            | `stripe-react-js` kütüphanesi ile Stripe.js yüklenir ve ödeme formu oluşturulur.                                                                                                                            | Kullanıcı, kredi kartı bilgilerini güvenli bir şekilde doğrudan Stripe'a ait olan forma girer.                      |
| 3    | Kullanıcı, "Siparişi Tamamla" butonuna basar.                             | **1. Backend Çağrısı:** `orders` tablosuna `pending_payment` durumunda bir sipariş kaydı oluşturmak için bir API endpoint'i çağrılır. Bu endpoint, Stripe'da bir `PaymentIntent` oluşturur ve `client_secret`'ı döner.<br/>**2. Stripe Onayı:** Frontend, bu `client_secret` ile `stripe.confirmPayment()` fonksiyonunu çağırarak ödemeyi onaylar. | Ödeme işlemi başlar. Kullanıcı bir yükleme (loading) durumu görür.                                                    |
| 4    | Ödeme başarılı olur.                                                      | **Stripe Webhook (Önerilen):** Stripe, ödeme başarılı olduğunda sunucunuza bir webhook gönderir. Bu webhook'u dinleyen bir API endpoint'i, sipariş durumunu `processing` olarak günceller ve stoktan düşer.<br/>**Client-side Yönlendirme:** `stripe.confirmPayment()` başarılı olursa, kullanıcı yönlendirilir. | `localStorage`'daki sepet temizlenir. Kullanıcı, sipariş onay sayfasına yönlendirilir: `/siparis/tesekkurler/[orderId]` |
| 5    | Kullanıcıya sipariş onayı gösterilir ve e-posta gönderilir.               | Teşekkürler sayfasında sipariş özeti yer alır. Arka planda Resend gibi bir servis aracılığıyla kullanıcıya sipariş detaylarını içeren bir e-posta gönderilir.                                                    | Kullanıcı, siparişinin başarıyla alındığını teyit eder.                                                               | 