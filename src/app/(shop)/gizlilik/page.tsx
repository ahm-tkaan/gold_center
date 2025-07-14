import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Gold Center',
  description: 'Gold Center gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.',
}

export default function GizlilikPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">
          Gizlilik Politikası
        </h1>
        
        <p className="text-lg text-neutral-600 mb-8">
          Son güncelleme: 14 Ocak 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Giriş</h2>
            <p className="text-neutral-700">
              Gold Center olarak, kişisel verilerinizin gizliliği konusunda hassasiyetimizi korumaktayız. 
              Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda 
              kişisel bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Toplanan Bilgiler</h2>
            <p className="text-neutral-700 mb-4">
              Aşağıdaki kişisel bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>İletişim bilgileriniz (ad, telefon numarası, e-posta adresi)</li>
              <li>Teslimat adresi bilgileri</li>
              <li>WhatsApp üzerinden paylaştığınız mesajlar</li>
              <li>Web sitesi kullanım bilgileri (IP adresi, tarayıcı bilgileri)</li>
              <li>Sipariş geçmişi ve ürün tercihleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Bilgilerin Kullanımı</h2>
            <p className="text-neutral-700 mb-4">
              Kişisel bilgilerinizi şu amaçlarla kullanırız:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Sipariş işlemlerini gerçekleştirmek</li>
              <li>Müşteri hizmetleri sunmak</li>
              <li>Ürün önerileri ve kampanyalar hakkında bilgi vermek</li>
              <li>Web sitesi deneyimini iyileştirmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Bilgi Paylaşımı</h2>
            <p className="text-neutral-700">
              Kişisel bilgilerinizi üçüncü şahıslarla paylaşmayız. Sadece aşağıdaki durumlar istisnadır:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-4">
              <li>Yasal zorunluluklar gereği</li>
              <li>Teslimat için kargo şirketleri ile (sadece gerekli bilgiler)</li>
              <li>Ödeme işlemleri için güvenilir ödeme sağlayıcıları ile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Veri Güvenliği</h2>
            <p className="text-neutral-700">
              Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirleri alırız. 
              Verileriniz şifrelenmiş bağlantılar üzerinden iletilir ve güvenli sunucularda saklanır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Çerezler (Cookies)</h2>
            <p className="text-neutral-700">
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. 
              Çerezleri tarayıcınızdan devre dışı bırakabilirsiniz, ancak bu durumda 
              bazı site özelliklerinin çalışmaması mümkündür.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Haklarınız</h2>
            <p className="text-neutral-700 mb-4">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verileriniz hakkında bilgi talep etme</li>
              <li>Verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini talep etme</li>
              <li>Veri işlemeye itiraz etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. İletişim</h2>
            <p className="text-neutral-700">
              Gizlilik politikası ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mt-4">
              <p className="text-neutral-700">
                <strong>E-posta:</strong> info@goldcenter.com<br />
                <strong>WhatsApp:</strong> +90 555 123 4567<br />
                <strong>Adres:</strong> Beyoğlu, İstanbul, Türkiye
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Politika Değişiklikleri</h2>
            <p className="text-neutral-700">
              Bu gizlilik politikasını gerekli gördüğümüz durumlarda güncelleyebiliriz. 
              Değişiklikler web sitemizde yayınlandığı tarihte yürürlüğe girer.
            </p>
          </section>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg mt-12">
          <p className="text-neutral-700 text-center">
            <strong>Not:</strong> Bu gizlilik politikası Gold Center tarafından hazırlanmış olup, 
            Türkiye Cumhuriyeti yasalarına ve KVKK'ya uygun şekilde düzenlenmiştir.
          </p>
        </div>
      </div>
    </div>
  )
}