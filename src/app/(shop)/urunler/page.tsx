import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/features/ProductCard'
import ProductFilters from '@/components/features/ProductFilters'
import { getAllProducts, getCategories } from '@/lib/db'
import { ProductWithVariants, Category } from '@/types'
import { ErrorBoundary, DatabaseErrorFallback } from '@/components/ErrorBoundary'
import { ProductGridSkeleton, CategoryFilterSkeleton, EmptyState } from '@/components/LoadingStates'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Ürünler - Gold Center',
  description: 'Yüksek kaliteli altın ve gümüş takı koleksiyonumuzu keşfedin.',
}

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'


async function ProductsSection() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]) as [ProductWithVariants[], Category[]]

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-1/4">
        <ErrorBoundary fallback={DatabaseErrorFallback}>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <ProductFilters categories={categories} products={products} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Products Grid */}
      <div className="lg:w-3/4">
        {products.length === 0 ? (
          <EmptyState
            title="Henüz ürün bulunmuyor"
            description="Yakında yeni ürünler eklenecek, takipte kalın!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              Tüm Ürünler
            </h1>
            <p className="text-neutral-600">
              Özenle seçilmiş mücevherat koleksiyonumuzu keşfedin
            </p>
          </div>

          <ErrorBoundary fallback={DatabaseErrorFallback}>
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsSection />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}