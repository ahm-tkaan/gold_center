import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/features/ProductCard'
import ProductFilters from '@/components/features/ProductFilters'
import { getAllProducts, getCategories } from '@/lib/db'
import { ProductWithVariants, Category } from '@/types'

export const metadata: Metadata = {
  title: 'Ürünler - Gold Center',
  description: 'Yüksek kaliteli altın ve gümüş takı koleksiyonumuzu keşfedin.',
}


export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]) as [ProductWithVariants[], Category[]]

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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <ProductFilters categories={categories} products={products} />
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-semibold text-neutral-600 mb-4">
                    Henüz ürün bulunmuyor
                  </h2>
                  <p className="text-neutral-500">
                    Yakında yeni ürünler eklenecek, takipte kalın!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}