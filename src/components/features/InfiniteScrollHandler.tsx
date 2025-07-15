'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InfiniteScrollHandler() {
  const router = useRouter()

  useEffect(() => {
    let isScrolling = false

    const handleScroll = () => {
      if (isScrolling) return
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Sayfa sonuna ulaşıldığında
      if (scrollTop + windowHeight >= documentHeight - 10) {
        isScrolling = true
        
        // Kısa bir delay ile en başa yönlendir
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          isScrolling = false
        }, 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [router])

  return null
}