'use server'
import Loading from '@/app/loading'
import { Card, CardHeader } from '@/components/ui/card'
import { Brand, Category, Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'






export default async function Cartegories() {


const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{next: { revalidate: 300 }})


  const { data : categories }: { data: Category[] } = await response.json();




  return (

<>


 
    <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-5">
      {categories.map((categories)=><div key={categories._id}>

     <Card className='
        mb-2
    group 
    transition-all duration-300
    hover:shadow-xl
    hover:-translate-y-1 
  
  "'>
<Link href={'/categories/'+categories._id}>
  <CardHeader>

<Image loading="lazy" src={categories.image} alt={categories.name}  width={400}  height={300} className=' 
  width={400}
  height={300}
  alt=""
  className="
    w-full
    transition-transform duration-300
    group-hover:scale-105'  />
    
  </CardHeader>

  </Link>



</Card>




</div>)}
    </div> 

</>






  )
}
