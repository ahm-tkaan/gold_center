"use client";

import { useState, createContext, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import type { Category, ProductWithVariants } from '@/types'

type FilterContextType = {
  selectedCategories: number[]
  priceRange: [number, number]
  setSelectedCategories: (categories: number[]) => void
  setPriceRange: (range: [number, number]) => void
}

const FilterContext = createContext<FilterContextType | null>(null)

type ProductFiltersProps = {
  categories: Category[]
  products: ProductWithVariants[]
}

export default function ProductFilters({ categories, products }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])

  // Fiyat aralığını hesapla
  const productPrices = products.map(p => p.base_price || 0).filter(price => price > 0)
  const minPrice = productPrices.length > 0 ? Math.min(...productPrices) : 0
  const maxPrice = productPrices.length > 0 ? Math.max(...productPrices) : 50000

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([minPrice, maxPrice])
  }

  const activeFiltersCount = selectedCategories.length + 
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0)

  return (
    <FilterContext.Provider value={{
      selectedCategories,
      priceRange,
      setSelectedCategories,
      setPriceRange
    }}>
      <Card className="sticky top-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filtrele</CardTitle>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Temizle ({activeFiltersCount})
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Kategori Filtreleri */}
          <div>
            <h3 className="font-semibold mb-3">Kategoriler</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const productCount = products.filter(p => p.category_id === category.id).length
                
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {productCount}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hızlı Kategori Linkleri */}
          <div>
            <h3 className="font-semibold mb-3">Hızlı Erişim</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-xs"
                >
                  <Link href={`/kategoriler/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div>
            <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={minPrice}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>₺{priceRange[0].toLocaleString('tr-TR')}</span>
                <span>₺{priceRange[1].toLocaleString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FilterContext.Provider>
  )
}

// Client Provider Component (placeholder - gerçek filtreleme için kullanılacak)
ProductFilters.ClientProvider = function ClientProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within ProductFilters')
  }
  return context
}