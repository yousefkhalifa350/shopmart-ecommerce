
 import React from 'react'
 import { Params } from 'next/dist/server/request/params'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import Link from 'next/link';
 import Image from 'next/image';
 import MystarIcon from '@/components/ui/mystarIcon/mystarIcon';
 import { Category, Product } from '@/interfaces';
 import Addtocart from '@/components/ui/Addcart/addtocart';


 export default async function CategoriesDetails({params}:{params:Params}) {

 const {categoriesID} = await params

 console.log( categoriesID);

 const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoriesID}`)

 const {data:categoryDetials} : {data:Product[]} = await response.json()


 console.log(categoryDetials);





   return (
 <>

 <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-5">


      {categoryDetials.length > 0 ? categoryDetials.map((product)=> <div key={product.id}>

     <Card className="
   mb-2
   group relative
rounded-xl
bg-white
border border-gray-200
overflow-hidden
transition-[box-shadow,border-color] duration-300 ease-out
hover:border-[#5875c3aa]
hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
  ">
<Link href={'/products/'+product.id}>
  <CardHeader>

 <Image loading="lazy" src={product.imageCover} alt={product.imageCover}  width={400}  height={400} className=' src={product.imageCover}
   width={400}
   height={300}
   alt=""
   className="
     aspect-square
          object-cover
          rounded-xl   w-full
  transition-transform duration-300'  />
     <CardDescription>{product.brand.name}</CardDescription>
     <CardTitle>{product.title.split('' , 6).join('')}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>

  </CardHeader>
   <CardContent>
   

 <div className='flex'>

 <MystarIcon/>
  <MystarIcon/>
 <MystarIcon/>
  <MystarIcon/>

   <p> {product.ratingsAverage}  </p>



 </div>

 <p className='pt-1'>  Price: <span className=' font-bold'>EGB {product.price}</span>  </p>
   </CardContent>

   </Link>

<Addtocart productId ={product.id}/>

 </Card>




 </div>  ) :  

 <div
   className="
    col-span-full
     flex
    items-center
    justify-center
    min-h-[60vh]
     sm:min-h-[65vh]
     md:min-h-[70vh]
     px-4
  "
 >
   <div className="flex flex-col items-center text-center max-w-xl">

     <div className=" text-6xl sm:text-7xl mb-5
//   transition-transform duration-300 ease-out
   hover:-translate-y-1 cursor-pointer">📦</div>

    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
       This Brand Has No Products Yet
    </h2>

     <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
      Products for this brand are currently unavailable.
      Please explore other brands or check back again soon.
    </p>

    <Link
      href="/brands"
       className="
        mt-7
       px-8 sm:px-10
       py-3
        rounded-xl
      bg-black
      text-white
      text-base sm:text-lg
       font-medium
        transition-all
         duration-300
        hover:bg-gray-800
       hover:scale-105
        active:scale-95
        shadow-lg
       "
    >

      Back to Brands
     </Link>

  </div>
 </div>

   }


    </div>
 </>
    
   )
 }