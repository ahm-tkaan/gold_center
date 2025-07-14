import { getCategoryBySlug, getProductsByCategory } from '@/lib/db'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Category, Product } from '@/types'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function KategoriDetayPage({ params }: PageProps) {
  const { slug } = await params
  
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id) as Product[]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
        <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/kategoriler" className="hover:text-primary">Kategoriler</Link>
        <span>/</span>
        <span className="text-neutral-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
        <div className="flex items-center justify-center mt-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {products.length} ürün
          </Badge>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].image_url}
                      alt={product.images[0].alt_text || product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-400 text-4xl">📷</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </CardTitle>
                
                {product.description && (
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                    {typeof product.description === 'string' ? product.description : JSON.stringify(product.description)}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    ₺{(product.base_price || 0).toLocaleString('tr-TR')}
                  </div>
                  {product.variants && product.variants.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {product.variants.length} varyant
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/urun/${product.slug}`}>
                    Detayları Gör
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl text-neutral-300 mb-4">📦</div>
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">
            Bu kategoride henüz ürün yok
          </h3>
          <p className="text-neutral-500 mb-6">
            Yakında bu kategoriye yeni ürünler eklenecek.
          </p>
          <Button asChild variant="outline">
            <Link href="/kategoriler">
              Diğer Kategorileri Görüntüle
            </Link>
          </Button>
        </div>
      )}

      {/* Back to Categories */}
      <div className="flex justify-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/kategoriler">
            ← Tüm Kategoriler
          </Link>
        </Button>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // Bu fonksiyon build time'da kategoriler için static paths oluşturur
  return [
    { slug: 'kolyeler' },
    { slug: 'yuzukler' },
    { slug: 'kupeler' },
    { slug: 'bilezikler' }
  ]
}