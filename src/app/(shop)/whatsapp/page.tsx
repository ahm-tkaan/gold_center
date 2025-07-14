import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WhatsApp Sipariş - Gold Center',
  description: 'WhatsApp üzerinden hızlı ve kolay sipariş verin. 7/24 müşteri hizmetimiz ile size yardımcı olalım.',
}

export default function WhatsAppPage() {
  const whatsappNumber = "+905551234567"
  const defaultMessage = "Merhaba! Gold Center ürünleri hakkında bilgi almak istiyorum."
  
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            WhatsApp ile Sipariş
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            7/24 WhatsApp müşteri hizmetimiz ile hızlı ve kolay sipariş verin. 
            Uzman ekibimiz size yardımcı olmaya hazır!
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-green-50 border-green-200">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4">📱</div>
              <CardTitle className="text-2xl text-green-700">
                Hemen İletişime Geçin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-600 mb-6">
                Tek tıkla WhatsApp üzerinden bize ulaşın
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4"
              >
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp&apos;ta Mesaj Gönder
                </Link>
              </Button>
              <p className="text-sm text-neutral-500 mt-4">
                {whatsappNumber}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">💬</div>
              <CardTitle className="text-lg">1. Mesaj Gönderin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                WhatsApp butonuna tıklayarak bize mesaj gönderin. 
                İstediğiniz ürün hakkında bilgi alın.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🛍️</div>
              <CardTitle className="text-lg">2. Ürün Seçin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Uzman ekibimiz size uygun ürünleri önerir. 
                Fotoğraf ve detayları paylaşırız.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">📦</div>
              <CardTitle className="text-lg">3. Teslimat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Siparişinizi onayladıktan sonra güvenli 
                kargo ile adresinize teslim ederiz.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="bg-neutral-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            WhatsApp Sipariş Avantajları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">7/24 Müşteri Hizmeti</h3>
                <p className="text-neutral-600 text-sm">
                  Her zaman ulaşabilir, anında yanıt alabilirsiniz
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Hızlı Sipariş</h3>
                <p className="text-neutral-600 text-sm">
                  Karmaşık formlar yok, sadece mesaj gönderin
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Kişisel Danışman</h3>
                <p className="text-neutral-600 text-sm">
                  Size özel ürün önerileri ve tavsiyeleri
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Güvenli Ödeme</h3>
                <p className="text-neutral-600 text-sm">
                  Kapıda ödeme ve güvenli ödeme seçenekleri
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/urunler">
              ← Ürünleri İnceleyin
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}