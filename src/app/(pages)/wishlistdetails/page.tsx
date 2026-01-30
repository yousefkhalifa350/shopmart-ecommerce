'use server'


import { getWishlistDetails } from "@/app/functions/Wishlist";
import { Product, ResponseWishlist } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import MystarIcon from "@/components/ui/mystarIcon/mystarIcon";
import Addtocart from "@/components/ui/Addcart/addtocart";
import Loading from "@/app/loading";
import { GetUserToken } from "@/app/Helpers/GetUserToken";
import { HeartIcon } from "lucide-react";
// import Searchform from "@/components/ui/SearchForm/searchform";

export default async function WishlistDetails() {


const token = await GetUserToken()

const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',   {

headers:{
  token:token!,

}

 
  })


const result = (await response.json()) as ResponseWishlist;
const res: Product[] = result.data;
console.log(res,'my data wishlist');



  return (

    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* ===== Title =====    */}
   
<h2 className="text-3xl font-semibold tracking-tight mb-8">
        Wishlist
      </h2>
      {/* ===== Wishlist Name =====   */}


   {/* <Searchform initialWishlist={res} /> */}
   

      {/* ===== Grid ===== */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 pt-5">
      { res.map((wishitem)=><div key={wishitem.id}>

      

<Card
  className="
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
  <Link href={`/products/${wishitem.id}`}>
    <CardHeader className="p-2">
      <Image
        src={wishitem.imageCover}
        alt={wishitem.title}
        width={400}
        height={400}
        className="
       
          aspect-square
          object-cover
          rounded-xl   w-full
  transition-transform duration-300
        "
      />
    </CardHeader>

    <CardContent className="px-3 pt-1 pb-0">
      <p className="text-xs text-muted-foreground">
        {wishitem.brand.name}
      </p>

      <CardTitle className="text-sm font-semibold leading-tight">
        {wishitem.title.split(' ', 4).join(' ')}
      </CardTitle>

      <p className="text-xs text-muted-foreground">
        {wishitem.category.name}
      </p>

      <div className="flex items-center gap-1 text-xs mt-1">
        <MystarIcon />
        <MystarIcon />
        <MystarIcon />
        <MystarIcon />
        <span className="text-muted-foreground">
          {wishitem.ratingsAverage}
        </span>
      </div>

      <p className="mt-1 text-sm font-bold">
        EGB {wishitem.price}
      </p>
    </CardContent>
  </Link>

  <Addtocart  productId={wishitem.id}  />
</Card>


</div>)}
    </div> 





      {res.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
  <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
    <HeartIcon className="w-10 h-10 text-gray-400" />
  </div>

  <h2 className="text-xl font-semibold mb-2">
    Your wishlist is empty
  </h2>

  <p className="text-gray-500 mb-6 max-w-sm">
    You haven’t added any products yet.
    Start exploring and save your favorites.
  </p>

  <Link
    href="/products"
    className="
      px-6 py-3
      rounded-full
      bg-black
      text-white
      font-medium
      hover:bg-[#2453d5e9]
      transition ease-in
    "
  >
    Browse products
  </Link>
</div>

      )}
    </div>
    
  );
}
