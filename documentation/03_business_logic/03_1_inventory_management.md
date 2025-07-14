# İş Mantığı: Envanter ve Stok Yönetimi

## 1. Temel Prensipler

Etkili bir envanter yönetimi, müşteri memnuniyetini sağlamak ve operasyonel hataları önlemek için kritik öneme sahiptir. Sistemimiz aşağıdaki temel prensiplere dayanacaktır:

- **Tek Gerçeklik Kaynağı (Single Source of Truth):** Bir ürünün stok miktarı için tek ve geçerli olan kaynak, `product_variants` tablosundaki `stock_quantity` sütunudur. Tüm stok kontrolleri bu değere göre yapılır.
- **Stok Rezervasyonu Yok:** Kullanıcı bir ürünü sepetine eklediğinde, o ürün için stok "rezerve edilmez". Bu, yönetimi karmaşık hale getiren ve süresi dolan sepetlerdeki ürünleri tekrar stoğa ekleme gibi ek işlemler gerektiren bir yöntem olduğu için bilinçli olarak tercih edilmemiştir. Stok, sadece ve sadece **başarılı bir ödeme** gerçekleştiğinde düşülür.
- **Negatif Stok Önlemi:** `product_variants` tablosuna `CHECK (stock_quantity >= 0)` kısıtlaması eklenerek, stok miktarının hiçbir koşulda negatif bir değere düşmemesi veritabanı seviyesinde garanti altına alınacaktır.

## 2. Stok Güncelleme Süreçleri

### 2.1. Stok Düşürme (Satın Alma Sonrası)

- **Tetikleyici:** Başarılı bir ödeme işleminin teyit edilmesi. Bu, en güvenilir yöntem olarak Stripe'tan gelen bir `webhook` bildirimi ile olmalıdır.
- **Aksiyon:** Ödemesi onaylanan siparişin içindeki her `order_item` için:
    1. İlgili `product_variant_id` bulunur.
    2. Bu varyantın `stock_quantity` değeri, siparişteki `quantity` kadar azaltılır.
- **Uygulama:** Bu işlem, atomikliği (tüm işlemlerin başarılı olması veya hiçbirinin olmaması) sağlamak için bir veritabanı `transaction`'ı içinde yapılmalıdır. Stripe webhook'unu işleyen API endpoint'i, bu `UPDATE` işlemini gerçekleştirecektir.
- **Problem Durumu (Race Condition):** İki farklı müşterinin son kalan 1 ürünü aynı anda satın alması durumunda, webhook'u ilk işlenen sipariş stoğu düşürür. İkinci webhook çalıştığında, `CHECK` kısıtlaması sayesinde stok eksiye düşmeyecek ve işlem hata verecektir. Bu durumda:
    1. İkinci sipariş, "Manuel İşlem Gerekiyor" gibi bir duruma alınır.
    2. Operasyon ekibine bildirim gönderilir.
    3. Müşteriye durum bilgilendirmesi yapılır ve para iadesi gerçekleştirilir.

### 2.2. Stok Artırma (İade ve İptal Durumları)

Stokların tekrar envantere eklenmesi iki ana senaryoda gerçekleşir:

1.  **Onaylanmış İade (Return):**
    - **Tetikleyici:** Bir yöneticinin, müşteriden geri gelen ürünü kontrol edip "tekrar satılabilir" olduğuna karar vererek iade talebini "İade Tamamlandı ve Stoğa Eklendi" olarak işaretlemesi.
    - **Aksiyon:** Yönetici panelindeki bu işlem, ilgili `return_items` içindeki ürünlerin stok miktarını `product_variants` tablosuna geri ekleyen bir fonksiyonu tetikler.

2.  **Sipariş İptali (Cancellation):**
    - **Tetikleyici:** Ödemesi yapılmış ancak henüz kargoya verilmemiş bir siparişin müşteri veya yönetici tarafından iptal edilmesi.
    - **Aksiyon:** Siparişi iptal etme işlevi, siparişin içindeki tüm `order_items`'ı gezerek ilgili ürünleri tekrar stoğa ekler.

## 3. Stok Durumunun Kullanıcıya Gösterimi

Kullanıcı arayüzünde stok bilgisi, satışları teşvik etmek ve beklentiyi doğru yönetmek için stratejik olarak kullanılacaktır:

- **`stock_quantity > 10` ise:** "Stokta" mesajı gösterilir.
- **`1 < stock_quantity <= 10` ise:** "Sınırlı Stok!" gibi bir ifadeyle aciliyet hissi oluşturulur.
- **`stock_quantity = 0` ise:** "Tükendi" mesajı gösterilir ve "Sepete Ekle" butonu devre dışı bırakılır.
- **Gelecek Geliştirmesi:** "Tükendi" durumundaki ürünler için "Gelince Haber Ver" özelliği eklenebilir. Bu özellik, ilgili ürüne bir `subscription` (abonelik) kaydı oluşturarak, ürün stoğa girdiğinde kullanıcılara otomatik e-posta gönderilmesini sağlar. 