import { createClient } from '@/lib/supabase/server'
import { DatabaseError, withErrorHandling } from '@/lib/error-handling'

export async function getHeroSliderImages() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('hero_slider_images')
      .select('id, title, description, image_url, alt_text')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Hero slider images fetch error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Hero slider images fetch error:', error)
    return []
  }
}

export async function getCategories() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Categories fetch error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Categories fetch error:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Category fetch error:', error)
    return null
  }

  return data
}

export async function getProductsByCategory(categoryId: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Products by category fetch error:', error)
    return []
  }

  return data || []
}

export async function getAllProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        variants:product_variants(*),
        images:product_images(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Products fetch error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Products fetch error:', error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
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

  if (error) {
    console.error('Product fetch error:', error)
    return null
  }

  return data
}