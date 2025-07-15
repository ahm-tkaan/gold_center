import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

export async function getHeroSliderImages() {
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
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Categories fetch error:', error)
    return []
  }

  return data || []
}

export async function getCategoryBySlug(slug: string) {
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