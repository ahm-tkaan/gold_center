import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda - Gold Center',
  description: 'Gold Center hakkında bilgi alın. Misyonumuz, vizyonumuz ve kalite anlayışımız.',
}

export default function HakkimizdaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-900 mb-6">
            Gold Center Hakkında
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Yılların deneyimi ile mücevherat sektöründe güvenilir adres. 
            Kalite, şıklık ve müşteri memnuniyeti odaklı hizmet anlayışımızla 
            size en iyisini sunuyoruz.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Hikayemiz
              </h2>
              <div className="prose prose-lg text-neutral-700">
                <p className="mb-4">
                  Gold Center olarak, mücevherat dünyasında kalite ve güvenin simgesi olmayı amaçlıyoruz. 
                  Kuruluşumuzdan bu yana, her bir müşterimize özel ve unutulmaz bir alışveriş deneyimi sunmak 
                  için çalışıyoruz.
                </p>
                <p className="mb-4">
                  Geleneksel işçilik ile modern tasarımı harmanlayan koleksiyonlarımız, 
                  özenle seçilmiş malzemeler ve titiz kalite kontrolleri ile sizlere ulaşıyor. 
                  Her ürünümüz, sevdiklerinizle paylaşacağınız özel anlar için tasarlanmıştır.
                </p>
                <p>
                  Müşteri memnuniyeti odaklı yaklaşımımız, 7/24 WhatsApp müşteri hizmetimiz ve 
                  güvenilir teslimat seçeneklerimizle, alışveriş deneyiminizi kolaylaştırıyoruz.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">💎</div>
              <CardTitle>Kalite</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Sadece en yüksek kaliteli malzemeler ve 
                titiz işçilik standardları ile ürünlerimizi hazırlıyoruz.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🤝</div>
              <CardTitle>Güven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Şeffaf fiyatlandırma, garanti belgesi ve 
                müşteri odaklı hizmet anlayışımızla güven veriyoruz.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">✨</div>
              <CardTitle>Şıklık</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Trend tasarımlar ve zamansız klasiklerle 
                her zevke uygun şık ürünler sunuyoruz.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">🛍️</span>
                  <span>Online Alışveriş</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  WhatsApp üzerinden kolayca sipariş verin. Tüm ürünlerimizin 
                  detaylı fotoğrafları ve bilgileri ile karar verin.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">🔧</span>
                  <span>Onarım Hizmeti</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Mevcut takılarınızın bakım ve onarım hizmetlerini 
                  uzman ekibimizle gerçekleştiriyoruz.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">🎨</span>
                  <span>Özel Tasarım</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Size özel tasarım takılar üretebiliriz. Hayalinizdeki 
                  ürünü gerçeğe dönüştürün.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">📦</span>
                  <span>Güvenli Teslimat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Sigortalı kargo ve kapıda ödeme seçenekleri ile 
                  güvenli teslimat garantisi sunuyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Sorularınız varsa veya özel isteğiniz bulunuyorsa, 
            7/24 müşteri hizmetlerimizden destek alabilirsiniz.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/whatsapp">
                WhatsApp ile İletişim
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/iletisim">
                İletişim Bilgileri
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}