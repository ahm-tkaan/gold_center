import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/db'
import { formatPrice } from '@/lib/utils'
import { ProductWithVariants } from '@/types'
import { WhatsAppButton } from '@/components/features/WhatsAppButton'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string): Promise<ProductWithVariants | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    return null
  }

  return product
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Ürün Bulunamadı - Gold Center',
    }
  }

  return {
    title: `${product.name} - Gold Center`,
    description: (product.description?.text as string) || `${product.name} - Yüksek kaliteli mücevherat`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const minPrice = product.variants?.reduce((min, variant) => 
    variant.price_in_cents < min ? variant.price_in_cents : min, 
    product.variants[0]?.price_in_cents || 0
  )
  const maxPrice = product.variants?.reduce((max, variant) => 
    variant.price_in_cents > max ? variant.price_in_cents : max, 
    product.variants[0]?.price_in_cents || 0
  )


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={product.images[0].image_url}
                    alt={product.images[0].alt_text || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-400">Görsel yok</span>
                </div>
              )}
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={image.id} className="aspect-square relative overflow-hidden rounded bg-neutral-100">
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || `${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                  {product.name}
                </h1>
                {product.category && (
                  <p className="text-neutral-600">
                    Kategori: {product.category.name}
                  </p>
                )}
              </div>

              <div className="text-3xl font-bold text-primary">
                {minPrice === maxPrice ? (
                  formatPrice(minPrice)
                ) : (
                  `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                )}
              </div>

              {product.description && (
                <div className="prose prose-neutral max-w-none">
                  <p>{(product.description.text as string) || 'Ürün açıklaması bulunmuyor.'}</p>
                </div>
              )}

              {product.variants && product.variants.length > 1 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Mevcut Varyantlar</h3>
                    <div className="space-y-2">
                      {product.variants.map((variant) => (
                        <div key={variant.id} className="flex justify-between items-center p-2 border rounded">
                          <span>{variant.sku}</span>
                          <span className="font-semibold">{formatPrice(variant.price_in_cents)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <WhatsAppButton productName={product.name} />
                
                <p className="text-sm text-neutral-600 text-center">
                  WhatsApp üzerinden hızlı ve güvenli sipariş verebilirsiniz
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}