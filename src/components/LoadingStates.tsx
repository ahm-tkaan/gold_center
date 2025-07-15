import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-6 w-2/3" />
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function HeroSliderSkeleton() {
  return (
    <div className="relative h-96 overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>
      </div>
      
      {/* Navigation dots skeleton */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </div>
  )
}

export function CategoryFilterSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex space-x-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero section skeleton */}
        <HeroSliderSkeleton />

        {/* Content skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <CategoryFilterSkeleton />
            </div>
            <div className="lg:w-3/4">
              <ProductGridSkeleton />
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ 
  title = "Henüz İçerik Yok", 
  description = "Şu anda görüntülenecek içerik bulunmuyor.",
  action
}: { 
  title?: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <svg 
          className="h-12 w-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-6 6-6-6" 
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action}
    </div>
  )
}

export function ConnectionError({ retry }: { retry: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bağlantı Sorunu</h3>
          <p className="text-sm text-gray-600">
            Sunucuya bağlanırken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edin.
          </p>
        </CardHeader>
        <CardContent>
          <button 
            onClick={retry}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Yeniden Dene
          </button>
        </CardContent>
      </Card>
    </div>
  )
}