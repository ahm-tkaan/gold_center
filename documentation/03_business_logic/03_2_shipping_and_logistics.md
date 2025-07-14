# İş Mantığı: Kargo ve Lojistik

## 1. Genel Bakış

Bu doküman, siparişlerin kargo ücretlerinin nasıl hesaplandığını ve bir siparişin "Hazırlanıyor" aşamasından "Teslim Edildi" aşamasına kadar olan lojistik akışını tanımlar. Amaç, hem müşteri için şeffaf bir ücretlendirme sunmak hem de operasyonel olarak verimli bir süreç oluşturmaktır.

## 2. Kargo Ücreti Hesaplama Stratejisi

Kargo ücretlendirmesi, müşteri memnuniyetini ve işletme maliyetlerini doğrudan etkiler. Projede, aşamalı olarak devreye alınabilecek esnek bir yapı hedeflenmektedir.

### Faz 1 (MVP) Yaklaşımı: Sabit Ücret ve Ücretsiz Kargo Limiti

Başlangıç için en basit ve en yaygın kullanılan model benimsenecektir.
- **Sabit Fiyat (Flat Rate):** Belirlenen bir sepet tutarının altındaki tüm siparişler için standart bir kargo ücreti uygulanır.
  - *Örnek:* Tüm siparişler için kargo ücreti **29.99 TL**.
- **Ücretsiz Kargo Limiti (Free Shipping Threshold):** Belirlenen bir sepet tutarını (kargo ücreti hariç) aşan siparişlerde kargo ücreti alınmaz. Bu, sepet ortalamasını artırmak için etkili bir yöntemdir.
  - *Örnek:* **500 TL** ve üzeri alışverişlerde kargo ücretsiz.

**Uygulama:**
Ödeme sayfasında (`/odeme`), sepetin ara toplamı kontrol edilir.
- `subtotal >= 50000` (kuruş cinsinden) ise `shipping_cost = 0`.
- `subtotal < 50000` ise `shipping_cost = 2999`.
Bu hesaplama, kullanıcı adresini girdikten sonra "Kargo Seçimi" adımında net olarak gösterilir ve sipariş özetine yansıtılır.

### Gelecek Fazlar İçin Geliştirme Seçenekleri

- **Bölgesel Fiyatlandırma (Shipping Zones):** Türkiye'nin farklı şehir veya bölgelerine farklı kargo ücretleri tanımlanabilir. Bu, `shipping_zones` ve `shipping_rates` gibi ek veritabanı tabloları gerektirir.
- **Ağırlık/Boyuta Göre Fiyatlandırma:** Özellikle ağır veya büyük ürünler için daha adil bir fiyatlandırma sunar. `product_variants` tablosuna `weight_in_grams`, `width_in_mm` gibi ek alanların eklenmesini gerektirir.

## 3. Sipariş Lojistik Akışı (Order Fulfillment)

Bu süreç, ödemesi alınmış bir siparişin yönetici panelinde nasıl işleme alınacağını tanımlar.

| Adım | Statü (Önce -> Sonra)          | Aksiyon (Yönetici / Sistem)                                                                                                                                                             | Müşteriye Etkisi                                                                                                |
| :--- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| 1    | `pending_payment` -> `processing` | Ödeme başarıyla alınır (Stripe webhook'u ile teyit edilir). Sipariş, yönetici panelindeki "Yeni Siparişler" listesine düşer. Stok, bu aşamada düşülür.                                        | Müşteriye "Siparişiniz Alındı" e-postası gönderilir.                                                             |
| 2    | `processing`                   | Mağaza yetkilisi, siparişteki ürünleri paketler ve tercih ettiği kargo firmasından (MNG, Yurtiçi vb.) manuel olarak bir kargo etiketi oluşturur.                                                | Müşteri, "Hesabım" -> "Siparişlerim" altında sipariş durumunu "Hazırlanıyor" olarak görür.                      |
| 3    | `processing` -> `shipped`      | Yetkili, yönetici panelinde ilgili siparişi bulur ve "Kargoya Verildi" olarak işaretler. Açılan forma **Kargo Firması** ve **Takip Numarası**'nı girer.                                           | -                                                                                                               |
| 4    | `shipped`                      | Sistem, bu bilgilerle `shipments` tablosunda yeni bir kayıt oluşturur ve ana siparişin durumunu `shipped` olarak günceller.                                                                    | Müşteriye, kargo takip numarasını ve linkini içeren "Siparişiniz Kargolandı" e-postası otomatik olarak gönderilir. |
| 5    | `shipped` -> `delivered`       | Kargo firmasının entegrasyonu (ileri faz) veya manuel olarak yönetici, kargonun teslim edildiğini sisteme işler. Siparişin durumu `delivered` olarak güncellenir.                                | Müşteri, sipariş durumunu "Teslim Edildi" olarak görür. İade süreci bu aşamadan sonra başlayabilir.              | 