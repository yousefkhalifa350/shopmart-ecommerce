'use client'
import React from 'react'
import RotatingText from './rotating-text'

export default function Herorotatingtext() {
  return (
   <>

<h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-[0.3em]">
  <RotatingText
    text={[
      "Featured Products",
      "Designed for You",
      "Quality First",
    ]}
    containerClassName="text-zinc-800"
  />
</h2>
   
   
   
   </>
  )
}
