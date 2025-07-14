import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kullanım Koşulları - Gold Center',
  description: 'Gold Center web sitesi ve hizmetleri kullanım koşulları.',
}

export default function KullanimKosullariPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">
          Kullanım Koşulları
        </h1>
        
        <p className="text-lg text-neutral-600 mb-8">
          Son güncelleme: 14 Ocak 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Genel Bilgiler</h2>
            <p className="text-neutral-700">
              Bu kullanım koşulları, Gold Center web sitesini ve hizmetlerini kullanımınız için 
              geçerli olan şartları belirlemektedir. Sitemizi kullanarak bu koşulları kabul etmiş 
              sayılırsınız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Hizmet Kapsamı</h2>
            <p className="text-neutral-700 mb-4">
              Gold Center olarak sunduğumuz hizmetler:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Mücevherat ve takı ürünlerinin online satışı</li>
              <li>WhatsApp üzerinden müşteri hizmetleri</li>
              <li>Ürün danışmanlığı ve önerileri</li>
              <li>Teslimat ve kurye hizmetleri</li>
              <li>Satış sonrası destek hizmetleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Sipariş ve Satış Koşulları</h2>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">3.1 Sipariş Verme</h3>
            <p className="text-neutral-700 mb-4">
              Siparişlerinizi WhatsApp üzerinden verebilirsiniz. Sipariş onaylandıktan sonra 
              ürün fiyatı ve teslimat bilgileri size iletilir.
            </p>
            
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">3.2 Fiyatlandırma</h3>
            <p className="text-neutral-700 mb-4">
              Ürün fiyatları güncel altın/gümüş fiyatlarına göre belirlenir ve değişiklik gösterebilir. 
              Sipariş anında geçerli fiyat uygulanır.
            </p>

            <h3 className="text-lg font-semibold text-neutral-800 mb-2">3.3 Stok Durumu</h3>
            <p className="text-neutral-700">
              Ürünlerimiz sınırlı stokta olabilir. Sipariş onayından sonra stok kontrolü yapılır 
              ve stokta olmayan ürünler için alternatif önerilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Ödeme Koşulları</h2>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li><strong>Kapıda Ödeme:</strong> Nakit veya kredi kartı ile ödeme yapabilirsiniz</li>
              <li><strong>Havale/EFT:</strong> Banka havalesi ile ön ödeme</li>
              <li><strong>Online Ödeme:</strong> Güvenli ödeme sistemleri ile kredi kartı</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Teslimat Koşulları</h2>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">5.1 Teslimat Süreleri</h3>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4">
              <li>İstanbul içi: 1-2 iş günü</li>
              <li>Türkiye geneli: 2-3 iş günü</li>
              <li>Özel tasarım ürünler: 5-7 iş günü</li>
            </ul>

            <h3 className="text-lg font-semibold text-neutral-800 mb-2">5.2 Kargo Güvenliği</h3>
            <p className="text-neutral-700">
              Tüm gönderiler sigortalı kargo ile yapılır. Teslimat sırasında hasarlı paket 
              teslim almayınız ve durumu hemen bildiriniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. İade ve Değişim</h2>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">6.1 İade Koşulları</h3>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4">
              <li>14 gün içinde hiçbir neden belirtmeden iade edebilirsiniz</li>
              <li>Ürün orijinal ambalajında ve kullanılmamış olmalıdır</li>
              <li>Özel tasarım ürünler iade kapsamı dışındadır</li>
              <li>İade kargo ücreti alıcıya aittir</li>
            </ul>

            <h3 className="text-lg font-semibold text-neutral-800 mb-2">6.2 Değişim</h3>
            <p className="text-neutral-700">
              Beden veya model değişimi için WhatsApp üzerinden iletişime geçiniz. 
              Stok durumuna göre değişim yapılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Garanti Koşulları</h2>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Tüm ürünlerimiz 2 yıl Gold Center garantisi ile satılır</li>
              <li>Garanti kapsamında üretim hatası ve malzeme kusurları yer alır</li>
              <li>Kullanıcı hatasından kaynaklanan hasarlar garanti kapsamı dışındadır</li>
              <li>Garanti belgesi ile birlikte servis hizmeti alabilirsiniz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Sorumluluk</h2>
            <p className="text-neutral-700">
              Gold Center, teknik aksaklıklar, sistemsel hatalar veya force majeure durumlarından 
              kaynaklanan zararlardan sorumlu değildir. Hizmet kesintileri önceden bildirilmeye çalışılır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Fikri Mülkiyet</h2>
            <p className="text-neutral-700">
              Web sitemizdeki tüm içerik, görseller ve tasarımlar Gold Center'a aittir. 
              İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Uygulanacak Hukuk</h2>
            <p className="text-neutral-700">
              Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. 
              Anlaşmazlıklar İstanbul mahkemelerinde çözülür.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. İletişim</h2>
            <p className="text-neutral-700">
              Kullanım koşulları ile ilgili sorularınız için:
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mt-4">
              <p className="text-neutral-700">
                <strong>WhatsApp:</strong> +90 555 123 4567<br />
                <strong>E-posta:</strong> info@goldcenter.com<br />
                <strong>Adres:</strong> Beyoğlu, İstanbul, Türkiye
              </p>
            </div>
          </section>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mt-12">
          <p className="text-amber-800 text-center">
            <strong>Önemli:</strong> Bu kullanım koşulları değişiklik gösterebilir. 
            Güncel koşulları web sitemizden takip edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}