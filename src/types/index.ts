export interface Category {
  id: number
  parent_id: number | null
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  created_at: string
}

export interface Product {
  id: number
  category_id: number | null
  name: string
  slug: string
  description: Record<string, unknown> | null
  base_sku: string | null
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  category?: Category
  variants?: ProductVariant[]
  images?: ProductImage[]
}

export interface ProductVariant {
  id: number
  product_id: number
  sku: string
  price_in_cents: number
  stock_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
  product?: Product
  images?: ProductImage[]
}

export interface ProductImage {
  id: number
  product_id: number
  variant_id: number | null
  image_url: string
  alt_text: string | null
  sort_order: number
  created_at: string
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[]
}

export interface ProductCardProps {
  product: ProductWithVariants
}

export interface CartItem {
  variant_id: number
  quantity: number
  variant: ProductVariant
}

export interface Cart {
  items: CartItem[]
  total_in_cents: number
}