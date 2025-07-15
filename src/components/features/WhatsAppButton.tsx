'use client'

import { Button } from '@/components/ui/button'

interface WhatsAppButtonProps {
  productName: string
  className?: string
}

export function WhatsAppButton({ productName, className }: WhatsAppButtonProps) {
  const handleWhatsAppOrder = () => {
    const message = `Merhaba! ${productName} ürününle ilgili bilgi almak istiyorum.`
    const whatsappUrl = `https://wa.me/905551234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button 
      size="lg" 
      className={className || "w-full"}
      onClick={handleWhatsAppOrder}
    >
      WhatsApp ile Sipariş Ver
    </Button>
  )
}