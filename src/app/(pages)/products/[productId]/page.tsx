
import { Product } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';

import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MystarIcon from '@/components/ui/mystarIcon/mystarIcon';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import ProductSlider from '@/components/ui/productslider/ProductSlider';
import Addtocart from '@/components/ui/Addcart/addtocart';
import Loading from '@/app/loading';



//////////////////////////////////////////////////////////////////////////////////////



//l params batrg3 promise fa lazm ndeha await
export   default async function ProductDetails({params}:{ params: Params} ) {


//params relataed for product ==> ID  
let {productId} = await params;

console.log(await params);




const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+ productId)


const {data:product}:{data:Product} = await response.json()

console.log(product);






  return (
    <>
    
    <Card className=' grid md:grid-cols-2 items-center w-3/4 mx-auto '>

<div>

<ProductSlider images={product.images} />

</div>


<div>
    <CardHeader>

          <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>

 
  </CardHeader>

  <CardContent>
  <CardDescription>{product.category.name}</CardDescription>

<div className='flex gap-1 pt-1 '>
<MystarIcon/>
<MystarIcon/>
<MystarIcon/>
<MystarIcon/>
<p>({product.ratingsQuantity})</p>

</div>


<div className='mt-2 flex  justify-between pt-2'>
  <p className=' font-bold'> {product.price}EGB</p>
    <p className=' font-bold'>Quantity: ( {product.price})</p>
</div>


  </CardContent>

<Addtocart productId ={product.id}/>


</div>


</Card> 
    
    
    </>
  )
}
