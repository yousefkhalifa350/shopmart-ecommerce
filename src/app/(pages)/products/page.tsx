'use server'
import Image from 'next/image';
import { Product } from '@/interfaces';
import { log } from 'node:console'
import React from 'react'
 import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MystarIcon from '@/components/ui/mystarIcon/mystarIcon';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import Addtocart from '@/components/ui/Addcart/addtocart';
import ProductDetails from './[productId]/page';
import Loading from '@/app/loading';



export default async function Products() {

const response = await fetch('https://ecommerce.routemisr.com/api/v1/products',  { next: { revalidate: 300 } })


//ver1
// const {data:product}:{data:Product[]} = await response.json()



//ver2
const result = await response.json();

const product: Product[] = Array.isArray(result.data) ? result.data : [];
                                  


  return  (
   <>
   
   
  <div className=" container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 ">
      {product.map((product)=><div key={product.id}>



<Card
  className="
   mb-2
   group relative
rounded-xl
bg-white
border border-gray-200
overflow-hidden
transition-[box-shadow,border-color] duration-300 ease-out
hover:border-[#5875c3aa]
hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
  "
>
  
  <Link href={`/products/${product.id}`}>
    <CardHeader className="p-2">
      <Image
        src={product.imageCover}
        alt={product.title}
        width={400}
        height={400}
        className="
       
          aspect-square
          object-cover
          rounded-xl   w-full
  transition-transform duration-300 "
      />
    </CardHeader>

    <CardContent className="px-3 pt-1 pb-0">
      <p className="text-xs text-muted-foreground">
        {product.brand.name}
      </p>

      <CardTitle className="text-sm font-semibold leading-tight">
        {product.title.split(' ', 4).join(' ')}
      </CardTitle>

      <p className="text-xs text-muted-foreground">
        {product.category.name}
      </p>

      <div className="flex items-center gap-1 text-xs mt-1">
        <MystarIcon />
        <MystarIcon />
        <MystarIcon />
        <MystarIcon />
        <span className="text-muted-foreground">
          {product.ratingsAverage}
        </span>
      </div>

      <p className="mt-1 text-sm font-bold">
        EGB {product.price}
      </p>
    </CardContent>
  </Link>

  <Addtocart  productId={product.id}  />
</Card>


</div>)}
    </div> 
   


   
   </>
  )


}
