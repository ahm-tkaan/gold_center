# Kullanıcı Akışı: Alışveriş Deneyimi

## 1. Genel Bakış

Bu doküman, bir kullanıcının ürünleri keşfetme, filtreleme, arama ve inceleme süreçlerini kapsar. Bu akış, kullanıcının bir ürünü "Sepete Ekle"meye karar vermesinden önceki tüm adımları içerir.

## 2. Ürün Keşfi ve Listeleme (Product Listing Page - PLP)

**Amaç:** Kullanıcının ürün kataloğunda kolayca gezinmesini ve aradığını bulmasını sağlamak.

| Adım | Aksiyon                                                                      | Teknik Uygulama                                                                                                       | Yönlendirme / Sonuç                                                                                                      |
| :--- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| 1    | Kullanıcı, ana menüden "Tüm Ürünler" veya bir kategoriye (örn: "Yüzükler") tıklar. | Link -> `/urunler` veya `/kategori/yuzukler`                                                                            | Kullanıcı, ürünlerin grid (ızgara) yapıda listelendiği Ürün Listeleme Sayfası'na (PLP) yönlendirilir.                 |
| 2    | Sayfa, ilgili ürünleri listeler.                                             | `getStaticProps` veya `getServerSideProps` ile ürün verisi çekilir. Kategoriye özel sayfalarda `slug`'a göre filtreleme yapılır. | Ürünlerin görselleri, isimleri ve fiyatları gösterilir.                                                                  |
| 3    | Çok sayıda ürün varsa, kullanıcı sayfalar arasında gezinir.                   | Sayfalama (Pagination) bileşeni kullanılır. URL'de sayfa numarası belirtilir (`/urunler?page=2`).                  | Kullanıcı, ürün listesinin altındaki sayfa numaralarına tıklayarak diğer ürünleri görüntüler.                              |

## 3. Filtreleme ve Sıralama

**Amaç:** Kullanıcının binlerce ürün arasından aradığını daraltmasına ve sonuçları istediği kritere göre sıralamasına olanak tanımak.

| Adım | Aksiyon                                                                   | Teknik Uygulama                                                                                                               | Sonuç                                                                                                                     |
| :--- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| 1    | Kullanıcı, PLP'nin yan tarafındaki (sidebar) filtreleme seçeneklerini görür. | Filtreler, ürünlerin `attributes` (nitelik) veritabanından dinamik olarak oluşturulur (örn: Renk, Materyal).             | Kullanıcıya "Renk", "Fiyat Aralığı", "Materyal" gibi filtreleme başlıkları sunulur.                                    |
| 2    | Kullanıcı, bir veya daha fazla filtre seçeneğini işaretler (örn: Renk: 'Altın'). | Seçilen her filtre, sayfa yeniden yüklenmeden (client-side) ürün listesini günceller ve URL'e query parametresi olarak eklenir (`?renk=altin`). | Ürün listesi, sadece seçilen kriterlere uyan ürünleri gösterecek şekilde anında güncellenir.                             |
| 3    | Kullanıcı, sıralama (sort) menüsünden bir seçenek seçer (örn: "Fiyata Göre Artan"). | Seçilen sıralama seçeneği de URL'e eklenir (`?sort=price_asc`). Ürünler, bu parametreye göre yeniden sıralanır.          | Ürünlerin gösterim sırası, kullanıcının seçtiği kritere göre değişir.                                                     |

## 4. Ürün Arama

**Amaç:** Kullanıcının aklındaki bir ürünü doğrudan aratarak bulmasını sağlamak.

| Adım | Aksiyon                                                               | Teknik Uygulama                                                                      | Yönlendirme / Sonuç                                                              |
| :--- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| 1    | Kullanıcı, sitenin üst kısmındaki arama çubuğuna bir terim yazar (örn: "kalp kolye"). | Input bileşeni kullanıcının yazdığı değeri state içinde tutar.                         | -                                                                                |
| 2    | Kullanıcı, "Enter" tuşuna basar veya arama ikonuna tıklar.              | Form gönderimi, kullanıcıyı arama sonuçları sayfasına yönlendirir.                   | Kullanıcı, `/urunler?q=kalp+kolye` gibi bir URL'e yönlendirilir.                 |
| 3    | Arama sonuçları sayfasında eşleşen ürünler listelenir.                | Sayfa, `q` parametresini alarak veritabanında ilgili alanlarda (isim, açıklama, sku) arama yapar. | Sadece arama terimiyle eşleşen ürünler PLP formatında kullanıcıya gösterilir.   |

## 5. Ürün Detaylarını Görüntüleme (Product Detail Page - PDP)

**Amaç:** Kullanıcıya bir ürün hakkında satın alma kararını verebilmesi için gerekli tüm bilgileri sunmak.

| Adım | Aksiyon                                                                                    | Teknik Uygulama                                                                                                                               | Sonuç                                                                                                                                                                     |
| :--- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Kullanıcı, PLP'de bir ürünün görseline veya ismine tıklar.                                 | Link -> `/urun/[slug]` (örn: `/urun/zarif-altin-kalp-kolye`)                                                                                    | Kullanıcı, o ürüne özel olarak oluşturulmuş Ürün Detay Sayfası'na (PDP) yönlendirilir.                                                                                    |
| 2    | Sayfada ürünün detaylı bilgileri gösterilir.                                               | `getStaticProps` ile `slug`'a göre ürün, varyant, ve resim bilgileri veritabanından çekilir.                                                 | Ürün adı, açıklaması, resim galerisi (zoom özellikli), fiyatı ve özellikleri gibi temel bilgiler yüklenir.                                                               |
| 3    | Kullanıcı, ürün varyantlarını (örn: Renk, Yüzük Ölçüsü) seçer.                             | Dropdown veya Renk/Buton kutucukları (swatches) kullanılır. Her seçim, ilgili state'i günceller.                                            | -                                                                                                                                                                         |
| 4    | Varyant seçimine göre ürün bilgileri dinamik olarak güncellenir.                           | Seçilen varyant kombinasyonuna göre `fiyat`, `stok durumu` (örn: "Stokta Var", "Tükendi"), `SKU` ve `ürün görselleri` anlık olarak değişir. | Kullanıcı, seçtiği yüzük ölçüsünün fiyatını veya altın renkli ürünün görselini anında görür. Bu, kafa karışıklığını önler ve deneyimi iyileştirir.                      |
| 5    | Kullanıcı, ürünle ilgili diğer içerikleri inceler.                                         | Aynı sayfada veya sekmeler (tabs) altında "Ürün Özellikleri", "Müşteri Yorumları", "Benzer Ürünler" gibi bileşenler yer alır.             | Kullanıcı, satın alma kararını destekleyecek ek bilgilere (boyutlar, materyal, diğer müşterilerin görüşleri vb.) kolayca erişir. | 