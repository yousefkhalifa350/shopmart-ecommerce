'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

import ProductDetails from '@/app/(pages)/products/[productId]/page';
import Image from 'next/image';






export default function ProductSlider({images}:{images:string[]}   ) {
  return (
 
<>

<Carousel

opts={{
    align: "start",
    loop: true,
  }}

 plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
>
  <CarouselContent className='p-4'>

    {images.map((img , index)=><CarouselItem key={index}> <Image height={300} width={400} alt={img} src={img}/></CarouselItem>)}

  </CarouselContent>

</Carousel>


</>


  )
}
