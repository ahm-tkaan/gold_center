import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim - Gold Center',
  description: 'Gold Center ile iletişime geçin. Telefon, WhatsApp, email ve adres bilgilerimiz.',
}

export default function IletisimPage() {
  const whatsappUrl = "https://wa.me/905551234567?text=Merhaba! İletişim sayfasından ulaşıyorum."

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            İletişim
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Sorularınız için bize ulaşın. Uzman ekibimiz size yardımcı olmaya hazır!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span>WhatsApp</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  7/24 WhatsApp müşteri hizmetimiz ile anında iletişim kurun
                </p>
                <div className="space-y-2">
                  <p className="font-medium">+90 555 123 4567</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      WhatsApp&apos;ta Mesaj Gönder
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <span>Telefon</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Müşteri hizmetlerimiz ile doğrudan konuşun
                </p>
                <div className="space-y-2">
                  <p className="font-medium">+90 555 123 4567</p>
                  <p className="text-sm text-neutral-500">
                    Pazartesi - Cumartesi: 09:00 - 19:00<br />
                    Pazar: 10:00 - 18:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">✉️</span>
                  <span>E-mail</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Detaylı sorularınız için email gönderebilirsiniz
                </p>
                <div className="space-y-2">
                  <p className="font-medium">info@goldcenter.com</p>
                  <p className="text-sm text-neutral-500">
                    24 saat içinde yanıtlanır
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <span>Adres</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Mağazamızı ziyaret edebilir, ürünleri yakından inceleyebilirsiniz
                </p>
                <div className="space-y-2">
                  <p className="font-medium">
                    Gold Center Mücevherat<br />
                    Beyoğlu, İstanbul<br />
                    Türkiye
                  </p>
                  <p className="text-sm text-neutral-500">
                    Pazartesi - Cumartesi: 10:00 - 20:00<br />
                    Pazar: 11:00 - 19:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Area */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Hızlı İletişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12 space-y-6">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-neutral-700">
                    En Hızlı İletişim: WhatsApp
                  </h3>
                  <p className="text-neutral-600">
                    Anında yanıt almak için WhatsApp&apos;tan mesaj gönderin. 
                    Tüm sorularınızı yanıtlamaya hazırız!
                  </p>
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      WhatsApp&apos;ta Soru Sor
                    </Link>
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Sosyal Medya</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild>
                      <Link href="#" target="_blank">
                        📘 Facebook
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="#" target="_blank">
                        📷 Instagram
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sık Sorulan Sorular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teslimat ne kadar sürer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  İstanbul içi 1-2 iş günü, diğer şehirler için 2-3 iş günü içinde teslim edilir.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ödeme seçenekleri neler?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Kapıda ödeme, havale/EFT ve kredi kartı ile ödeme seçeneklerimiz bulunmaktadır.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İade politikası nasıl?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  14 gün içinde hiçbir neden belirtmeden iade edebilirsiniz. Ürün ambalajında olmalıdır.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Garanti süresi nedir?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Tüm ürünlerimiz 2 yıl Gold Center garantisi ile satılmaktadır.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}