'use client'

import React from 'react'
import FlipWordsup from '@/components/ui/hero-up-down'
import FlipWords from './FlipWordsup'

export default function HeroUpDown() {
  return (
    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-[0.2em] text-center">
      Browse{" "}
      <FlipWords
        words={["smart","popular","top"]}
        className="font-black text-neutral-900"
      />{" "}
      categories
    </h2>
  )
}
