# İş Mantığı: Ürün Arama Stratejisi

## 1. Genel Yaklaşım

Etkili bir arama fonksiyonu, kullanıcıların aradıkları ürünlere hızlıca ulaşmasını sağlayarak doğrudan satışları etkiler. Projemizde, arama özelliğini iki ana fazda geliştirmeyi hedefliyoruz: MVP için basit ve hızlı bir başlangıç, ardından daha ölçeklenebilir ve akıllı bir çözüm.

## 2. Faz 1 (MVP): Basit Metin Arama (`ILIKE`)

Projenin ilk aşamasında, hızlı bir başlangıç yapmak için PostgreSQL'in temel metin arama kabiliyetlerinden yararlanacağız.

- **Teknik Yaklaşım:** Case-insensitive (büyük/küçük harfe duyarsız) bir arama yapmak için standart SQL `ILIKE` operatörü kullanılacaktır.
- **Uygulama:** Arama API endpoint'i, kullanıcıdan gelen arama terimini (`q`) alacak ve bu terimi `products` tablosunun `name`, `description` ve `base_sku` gibi ilgili metin alanlarında arayacaktır.

- **Örnek SQL Sorgusu:**
  ```sql
  -- Kullanıcının 'altın yüzük' araması yaptığını varsayalım.
  SELECT * FROM products
  WHERE
      name ILIKE '%altın yüzük%' OR
      description ILIKE '%altın yüzük%';
  ```

- **Avantajları:**
    - **Hızlı Geliştirme:** Çok kolay ve hızlı bir şekilde implemente edilebilir.
    - **Kurulum Gerektirmez:** Ekstra bir veritabanı kurulumu veya konfigürasyonu gerektirmez.

- **Dezavantajları:**
    - **Performans:** Veritabanı büyüdükçe yavaşlar, çünkü standart index'leri verimli kullanamaz.
    - **Dil Bilgisi Yok:** Kelimelerin köklerini veya eklerini anlamaz. Örneğin, "yüzükler" diye aratıldığında, içinde sadece "yüzük" geçen bir ürünü bulamaz.
    - **Yazım Hataları:** Yazım hatalarını tolere edemez.
    - **Alaka Düzeyi (Relevance) Yok:** Sonuçları, arama teriminin başlıkta mı yoksa uzun bir açıklamanın içinde mi geçtiğine bakmaksızın aynı öncelikle listeler.

## 3. Faz 2/3 (Gelişmiş): PostgreSQL Full-Text Search (FTS)

Proje olgunlaştıkça ve ürün sayısı arttıkça, daha profesyonel bir arama deneyimi sunmak için PostgreSQL'in dahili Full-Text Search (FTS) motoruna geçiş yapacağız.

- **Teknik Yaklaşım:** FTS, metinleri dil bilgisi kurallarına göre analiz ederek (stemming, stop words) ve bunları özel index'ler kullanarak çok hızlı bir şekilde aramamızı sağlar.

- **Uygulama Adımları:**
    1. **Yeni Sütun Ekleme:** `products` tablosuna `document_vector tsvector` tipinde yeni bir sütun eklenir. Bu sütun, aranacak metinlerin özel bir formatta saklanmasını sağlar.
    2. **Otomatik Güncelleme için Trigger:** `products` tablosundaki `name` veya `description` güncellendiğinde, `document_vector` sütununu otomatik olarak güncelleyecek bir veritabanı tetikleyicisi (trigger) oluşturulur. Bu trigger, `to_tsvector('turkish', name || ' ' || description)` gibi bir fonksiyon kullanır ve Türkçe dil bilgisi kurallarına göre metni analiz eder.
    3. **GIN Index Oluşturma:** `document_vector` sütunu üzerinde, çok hızlı arama yapılmasını sağlayan özel bir `GIN` index'i oluşturulur.
    4. **Sorgu Güncelleme:** Arama API endpoint'i, kullanıcıdan gelen arama terimini `websearch_to_tsquery('turkish', q)` gibi bir fonksiyonla `tsquery` formatına çevirir ve arama için `@@` operatörünü kullanır.
    5. **Alaka Düzeyine Göre Sıralama:** Sonuçlar, `ts_rank()` fonksiyonu kullanılarak arama terimiyle en alakalı olan ürün en üstte çıkacak şekilde sıralanır.

- **Örnek SQL Sorgusu:**
  ```sql
  -- Kullanıcının 'altın yüzükler' araması yaptığını varsayalım.
  -- FTS, 'yüzükler' kelimesini 'yüzük' köküne indirgeyerek arama yapar.
  SELECT
    *,
    ts_rank(document_vector, websearch_to_tsquery('turkish', 'altın yüzükler')) as relevance
  FROM products
  WHERE
    document_vector @@ websearch_to_tsquery('turkish', 'altın yüzükler')
  ORDER BY relevance DESC;
  ```

- **Avantajları:**
    - **Yüksek Performans:** Büyük veri setlerinde bile çok hızlıdır.
    - **Türkçe Dil Desteği:** Kelime köklerini anlama (stemming) sayesinde "yüzük" ve "yüzükler" aramalarında aynı sonuçları verir.
    - **Alaka Düzeyine Göre Sıralama:** Kullanıcıya en doğru sonuçları en üstte gösterir.
    
- **Dezavantajları:**
    - Daha fazla veritabanı konfigürasyonu ve kurulumu gerektirir.

Bu aşamalı yaklaşım, projenin başlangıcında hızlı hareket etmemizi sağlarken, gelecekteki büyüme için de sağlam bir zemin hazırlar. 