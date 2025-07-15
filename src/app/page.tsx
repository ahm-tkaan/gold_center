import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroSlider } from '@/components/HeroSlider'
import { getHeroSliderImages } from '@/lib/db'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HeroSliderSkeleton } from '@/components/LoadingStates'
import { Suspense } from 'react'
import Link from 'next/link'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

async function HeroSliderSection() {
  const sliderImages = await getHeroSliderImages()
  return <HeroSlider images={sliderImages} />
}

export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Slider Section */}
        <ErrorBoundary>
          <Suspense fallback={<HeroSliderSkeleton />}>
            <HeroSliderSection />
          </Suspense>
        </ErrorBoundary>

        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Gold Center&apos;a Hoş Geldiniz
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Yüksek kaliteli altın ve gümüş takılar, mücevherat ve aksesuar koleksiyonumuzla 
              şıklığınızı tamamlayın. Özel tasarım ve el işçiliğiyle hazırlanmış ürünler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/urunler">Ürünleri İncele</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/whatsapp">WhatsApp ile Sipariş</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
              Neden Gold Center?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Kaliteli Malzeme</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sadece yüksek kaliteli altın, gümüş ve değerli taşlar kullanıyoruz.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Özel Tasarım</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Uzman tasarımcılarımız tarafından özel olarak hazırlanmış koleksiyonlar.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Hızlı Teslimat</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    WhatsApp üzerinden hızlı sipariş ve güvenli teslimat seçenekleri.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Özel Tasarım Takılarımızı Keşfedin
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Koleksiyonumuzda size özel tasarım takıları bulabilir, 
              WhatsApp üzerinden kolayca sipariş verebilirsiniz.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/urunler">Koleksiyonu Görüntüle</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
