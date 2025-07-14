import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Gold Center</h3>
            <p className="text-gray-300">
              Yüksek kaliteli mücevherat ve takı koleksiyonumuzla şıklığınızı tamamlayın.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Ürünler</h4>
            <ul className="space-y-2">
              <li><Link href="/urunler" className="text-gray-300 hover:text-primary transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/kategoriler/yuzukler" className="text-gray-300 hover:text-primary transition-colors">Yüzükler</Link></li>
              <li><Link href="/kategoriler/kolyeler" className="text-gray-300 hover:text-primary transition-colors">Kolyeler</Link></li>
              <li><Link href="/kategoriler/kupeler" className="text-gray-300 hover:text-primary transition-colors">Küpeler</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="text-gray-300 hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-gray-300 hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link href="/gizlilik" className="text-gray-300 hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-kosullari" className="text-gray-300 hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-2 text-gray-300">
              <p>Telefon: +90 555 123 4567</p>
              <p>Email: info@goldcenter.com</p>
              <p>Adres: İstanbul, Türkiye</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Gold Center. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}