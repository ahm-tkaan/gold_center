import { getCategories } from '@/lib/db'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/types'
import InfiniteScrollHandler from '@/components/features/InfiniteScrollHandler'

export default async function KategorilerPage() {
  const categories = await getCategories() as Category[]

  return (
    <>
      <InfiniteScrollHandler />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Navbar Section */}
      <div className="h-screen snap-start">
        <Navbar />
        
        {/* Hero Section */}
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 mb-6">
              Kategoriler
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto">
              Geniş ürün yelpazemizi keşfedin. Her kategori özenle seçilmiş kaliteli ürünlerle doludur.
            </p>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {categories.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-primary/30"
                />
              ))}
            </div>
            
            <div className="animate-bounce">
              <svg
                className="w-8 h-8 text-primary mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <div key={category.id} className="h-screen snap-start relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            {category.image_url && (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center max-w-4xl mx-auto px-4">
              <div className="text-6xl mb-8">
                {getCategoryIcon(category.slug)}
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                {category.name}
              </h2>
              
              {category.description && (
                <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
                  {category.description}
                </p>
              )}

              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <Link href={`/kategoriler/${category.slug}`}>
                    Ürünleri İncele
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Link href="/urunler">
                    Tüm Ürünler
                  </Link>
                </Button>
              </div>

              {/* Category Navigation */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {categories.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === index ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      </div>
    </>
  )
}

function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    'kolyeler': '📿',
    'yuzukler': '💍',
    'kupeler': '💎',
    'bilezikler': '⚡',
  }
  return icons[slug] || '✨'
}