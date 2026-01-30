"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Category } from "@/interfaces";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";



export default function Categoriesslider() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }

    getCategories();
  }, []);

  return (
<Carousel
  opts={{
    align: "start",
    loop: true,
  
  }}
  plugins={[
    Autoplay({
      delay: 800,
        stopOnInteraction: false,
  stopOnMouseEnter: false,
      
    }),
  ]}
  className="w-full max-w-7xl mx-auto overflow-hidden touch-pan-x"
>
  <CarouselContent className="p-4">
    {categories.map((cat) => (
      <CarouselItem
        key={cat._id}
         className="
          basis-1/3        /* very small phones → 5 cards */
          sm:basis-1/4     /* mobile → 4 cards */
          md:basis-1/6
          lg:basis-1/7
        "
      >
        <Link href={`/categories/${cat._id}`} className="block">
          <div className="px-2">
            <div className="   relative w-full
                h-[120px]
                sm:h-[50px]
                md:h-[100px]
                lg:h-[200px]
                overflow-hidden
                rounded-2xl">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-3 text-center text-lg font-semibold">
              {cat.name}
            </p>
          </div>
        </Link>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

  );
}
