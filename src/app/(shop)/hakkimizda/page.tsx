import { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/features/WhatsAppButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hakkımızda - Gold Center | Mücevherat ve Takı Merkezi',
  description: '30 yıllık tecrübeyle Gold Center hakkında bilgi alın. Misyonumuz, vizyonumuz ve kalite anlayışımız. Premium mücevherat ve takı koleksiyonu.',
  keywords: ['Gold Center hakkında', 'mücevherat mağazası', 'altın takı', 'güvenilir mücevherat', 'kaliteli takı'],
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Gold Center
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto">
              30 yıllık deneyimimizle mücevherat dünyasında güvenin adresi
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hikayemiz Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Hikayemiz
                </h2>
                <div className="prose prose-lg text-neutral-700 space-y-4">
                  <p>
                    1993 yılında kurulan Gold Center, mücevherat sektöründe üç neslin birikimi ile 
                    size hizmet vermektedir. Geleneksel altın işçiliğini modern tasarım anlayışı 
                    ile harmanlayarak, her yaştan müşterimize hitap eden koleksiyonlar yaratıyoruz.
                  </p>
                  <p>
                    Kalite anlayışımız, sadece malzeme seçiminde değil, aynı zamanda müşteri 
                    hizmetlerinde de kendini göstermektedir. Her bir ürünümüz özenle seçilmiş, 
                    titizlikle işlenmiş ve güven belgesi ile size sunulmaktadır.
                  </p>
                  <p>
                    Bugün binlerce mutlu müşterimizle, Türkiye&apos;nin önde gelen mücevherat 
                    markalarından biri haline gelmenin gururunu yaşıyoruz.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src="/images/goldcenter-story.jpg"
                    alt="Gold Center Hikayesi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-4xl text-primary-foreground font-bold">30+</span>
                </div>
                <div className="absolute -bottom-2 -right-2 text-primary-foreground text-sm font-medium">
                  Yıl Tecrübe
                </div>
              </div>
            </div>
          </section>

          {/* Değerlerimiz Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Değerlerimiz
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Müşteri memnuniyeti odaklı hizmet anlayışımızın temel taşları
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">💎</div>
                  <CardTitle className="text-xl">Kalite</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm">
                    14-22 ayar altın, 925 ayar gümüş ve sertifikalı değerli taşlarla 
                    üretilen premium ürünler.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">🛡️</div>
                  <CardTitle className="text-xl">Güven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm">
                    Şeffaf fiyatlandırma, garanti belgesi ve müşteri hakları 
                    odaklı hizmet anlayışı.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">✨</div>
                  <CardTitle className="text-xl">Tasarım</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm">
                    Güncel trendleri takip eden, zamansız klasiklerle modern 
                    tasarımları harmanlayan koleksiyonlar.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">❤️</div>
                  <CardTitle className="text-xl">Hizmet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm">
                    7/24 WhatsApp müşteri hizmetleri, ücretsiz kargo ve 
                    satış sonrası destek garantisi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Hizmetlerimiz Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Sunduğumuz Hizmetler
              </h2>
              <p className="text-xl text-neutral-600">
                Size en iyi alışveriş deneyimini sunmak için
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">🛍️</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Online Alışveriş</h3>
                    <p className="text-neutral-600">
                      WhatsApp üzerinden kolayca ürün inceleyebilir, detaylı bilgi alabilir 
                      ve güvenle sipariş verebilirsiniz.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">🔧</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Takı Bakım & Onarım</h3>
                    <p className="text-neutral-600">
                      Mevcut takılarınızın bakım, temizlik ve onarım işlemlerini 
                      uzman ekibimizle gerçekleştiriyoruz.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">🎨</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Özel Tasarım</h3>
                    <p className="text-neutral-600">
                      Hayalinizdeki ürünü gerçeğe dönüştürüyoruz. Size özel tasarım 
                      takılar için bizimle iletişime geçin.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">📦</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Güvenli Teslimat</h3>
                    <p className="text-neutral-600">
                      Sigortalı kargo, kapıda ödeme seçeneği ve özel ambalaj ile 
                      ürünleriniz güvenle elinize ulaşır.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Sorularınız varsa veya özel isteğiniz bulunuyorsa, 7/24 müşteri 
              hizmetlerimizden destek alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton 
                productName="Gold Center hakkında bilgi almak" 
                className="px-8 py-3"
              />
              <Button asChild variant="outline" size="lg" className="px-8 py-3">
                <Link href="/iletisim">
                  İletişim Bilgileri
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