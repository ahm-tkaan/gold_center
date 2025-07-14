import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { ProductWithVariants } from '@/types'

interface ProductCardProps {
  product: ProductWithVariants
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]
  const minPrice = product.variants?.reduce((min, variant) => 
    variant.price_in_cents < min ? variant.price_in_cents : min, 
    product.variants[0]?.price_in_cents || 0
  )
  const maxPrice = product.variants?.reduce((max, variant) => 
    variant.price_in_cents > max ? variant.price_in_cents : max, 
    product.variants[0]?.price_in_cents || 0
  )

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          {mainImage ? (
            <Image
              src={mainImage.image_url}
              alt={mainImage.alt_text || product.name}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <span className="text-neutral-400">Görsel yok</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-neutral-900 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="text-lg font-bold text-primary">
            {minPrice === maxPrice ? (
              formatPrice(minPrice)
            ) : (
              `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
            )}
          </div>
          
          {product.variants && product.variants.length > 1 && (
            <p className="text-sm text-neutral-600 mt-1">
              {product.variants.length} varyant mevcut
            </p>
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
  )
}