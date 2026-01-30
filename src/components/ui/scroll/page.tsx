"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-18 right-4 z-[9999]">
      <Button
        onClick={scrollToTop}
        size="icon"
        className="
          rounded-full
          shadow-lg
          bg-primary text-primary-foreground
          transition-all
          hover:scale-110
          active:scale-95
        "
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
