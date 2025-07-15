import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/features/WhatsAppButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'İletişim - Gold Center | Mücevherat ve Takı Merkezi',
  description: 'Gold Center ile iletişime geçin. 7/24 WhatsApp müşteri hizmetleri, telefon, email ve mağaza adres bilgilerimiz. Uzman ekibimizle anında iletişim kurun.',
  keywords: ['Gold Center iletişim', 'WhatsApp müşteri hizmetleri', 'mücevherat mağaza telefon', 'takı satış iletişim'],
}

export default function IletisimPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto">
              Size yardımcı olmak için buradayız. 7/24 müşteri hizmetlerimizle anında iletişim kurun.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* İletişim Yöntemleri */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Bizimle İletişim Kurun
              </h2>
              <p className="text-xl text-neutral-600">
                Size en uygun iletişim kanalını seçin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* WhatsApp Card */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-green-200 bg-green-50/50">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📱</div>
                  <CardTitle className="text-2xl text-green-700">WhatsApp</CardTitle>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block">
                    7/24 Aktif
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-neutral-600">
                    En hızlı iletişim yolu. Anında yanıt alın, ürün fotoğrafları gönderin.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">+90 555 123 4567</p>
                    <WhatsAppButton 
                      productName="iletişim kurmak"
                      className="w-full bg-green-600 hover:bg-green-700"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Telefon Card */}
              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📞</div>
                  <CardTitle className="text-2xl">Telefon</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-neutral-600">
                    Doğrudan konuşmak istiyorsanız bizi arayın.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">+90 555 123 4567</p>
                    <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded">
                      <p><strong>Pazartesi - Cumartesi:</strong> 09:00 - 19:00</p>
                      <p><strong>Pazar:</strong> 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">✉️</div>
                  <CardTitle className="text-2xl">E-Mail</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-neutral-600">
                    Detaylı sorularınız için email gönderebilirsiniz.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">info@goldcenter.com</p>
                    <div className="text-sm text-neutral-500 bg-neutral-50 p-2 rounded">
                      24 saat içinde yanıtlanır
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="mailto:info@goldcenter.com">
                        E-Mail Gönder
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mağaza Bilgileri */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Mağazamızı Ziyaret Edin
                </h2>
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">📍</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Adresimiz</h3>
                        <p className="text-neutral-600 mb-4">
                          Ürünlerimizi yakından görmek ve dokunmak için mağazamızı ziyaret edebilirsiniz.
                        </p>
                        <div className="space-y-1">
                          <p className="font-medium">Gold Center Mücevherat</p>
                          <p className="text-neutral-600">Beyoğlu Caddesi No: 123/A</p>
                          <p className="text-neutral-600">Beyoğlu / İstanbul</p>
                          <p className="text-neutral-600">Türkiye</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">🕐</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Çalışma Saatleri</h3>
                        <div className="space-y-1 text-neutral-600">
                          <p><strong>Pazartesi - Cumartesi:</strong> 10:00 - 20:00</p>
                          <p><strong>Pazar:</strong> 11:00 - 19:00</p>
                          <p className="text-sm text-primary font-medium mt-2">
                            * Resmi tatillerde kapalıyız
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Harita placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-lg font-medium">Mağaza Konumu</p>
                      <p className="text-sm">Beyoğlu, İstanbul</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sık Sorulan Sorular */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Sık Sorulan Sorular
              </h2>
              <p className="text-xl text-neutral-600">
                Merak ettiklerinizin yanıtları burada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">🚚</span>
                    <span>Teslimat ne kadar sürer?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    <strong>İstanbul içi:</strong> 1-2 iş günü<br />
                    <strong>Diğer şehirler:</strong> 2-3 iş günü<br />
                    <span className="text-sm text-primary">* Ücretsiz kargo 500 TL üzeri siparişlerde</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <span>Ödeme seçenekleri neler?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-neutral-600 space-y-1">
                    <p>• Kapıda ödeme (nakit/kart)</p>
                    <p>• Havale/EFT</p>
                    <p>• Kredi kartı (taksit seçenekleri mevcut)</p>
                    <p>• WhatsApp üzerinden güvenli ödeme</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">🔄</span>
                    <span>İade politikası nasıl?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    14 gün içinde hiçbir neden belirtmeden iade edebilirsiniz. 
                    Ürün orijinal ambalajında ve kullanılmamış olmalıdır. 
                    İade kargo ücreti tarafımızdan karşılanır.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">🛡️</span>
                    <span>Garanti süresi nedir?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    Tüm ürünlerimiz <strong>2 yıl Gold Center garantisi</strong> ile satılmaktadır. 
                    Garanti kapsamı: İşçilik hatası, renk bozulması ve taş düşmesi 
                    (kullanım hatası hariç).
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sosyal Medya */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Bizi Takip Edin
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Yeni koleksiyonlarımızdan haberdar olmak ve özel kampanyalarımızı kaçırmamak için 
              sosyal medya hesaplarımızı takip edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button asChild variant="outline" className="flex-1">
                <Link href="#" target="_blank">
                  📘 Facebook
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="#" target="_blank">
                  📷 Instagram
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="#" target="_blank">
                  🐦 Twitter
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}