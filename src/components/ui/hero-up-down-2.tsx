'use client'

import React from 'react'
import FlipWordsup from '@/components/ui/hero-up-down'
import FlipWords from './FlipWordsup'

export default function HeroUpDowntow() {
  return (
    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-[0.2em] text-center mb-10">
      Browse{" "}
      <FlipWords
        words={["leading", "premium", "global"]}
        className="font-black text-neutral-900"
      />{" "}
      brands
    </h2>
  )
}
