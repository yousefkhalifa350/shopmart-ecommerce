'use server'
import { AddProducttoCart } from '@/app/functions/addProducttoCart';
import Loading from '@/app/loading';

import { Brand } from '@/interfaces';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

 export  default async function Brands() {

const response = await fetch ('https://ecommerce.routemisr.com/api/v1/brands',{next: { revalidate: 300 }})

const {data:brand} :{data:Brand[]}  =  await response.json()






  return (
    <>
   
    

 <div className=' container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 mb-2'>
  {brand.map((thebrand) => (
  <Link href={'/brands/'+thebrand._id} key={thebrand._id}>
  
    <div 
      
      className="bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:shadow-lg hover:scale-90 border-2 p-4"
    >
      <Image 
        src={thebrand.image} 
        alt={thebrand.name} 
        width={350} 
        height={170} 
        className='w-full h-[180px] object-contain rounded-lg mb-3 '
      />
      <p className="text-lg font-medium text-center">{thebrand.name}</p>
    </div>
  
  </Link>
  ))}
</div> 






    
    </>
  )
}
