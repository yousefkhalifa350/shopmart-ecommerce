'use client'
import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

 import { Button } from "@/components/ui/button"
import { BluetoothConnected, HeartIcon, Loader, Loader2, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import Loading from '@/app/loading'
import { cartcontext } from '@/components/context/Cartcontext'

import { AddProducttoCart } from '@/app/functions/addProducttoCart'
import { CartResponse } from '@/interfaces'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addWishlistItem, removeWishlistItem } from '@/app/functions/Wishlist'




export default function Addtocart({productId}:{productId:string}) {
const ID = productId
const router = useRouter()

useEffect(() => {
  const saved = localStorage.getItem(`wishlist-${ID}`);
  setIsWishlisted(!!saved);
}, [ID]);


let {Getcart , setCartdata, isloading , setIsloading} = useContext(cartcontext)

const [loading, setLoading] = useState(false)
const [isWishlisted, setIsWishlisted] = useState(false)
const [red, setRed] = useState(false)
const session = useSession()

async function addproducttocart () { 
  
 setLoading(true)

if(session.status=='authenticated'){
 

const data:CartResponse = await AddProducttoCart(productId)

data.status=='success' && toast.success('Product added successfully to your cart')

setCartdata(data)

setLoading(false)
}else{
  
router.push('/login')
toast.error('Please Login First')

}


}






async function toggleWishlist() {

  if (!isWishlisted) {
    // ADD
    const data: CartResponse = await addWishlistItem(ID)

    if (data.status === 'success') {
      setIsWishlisted(true)
      localStorage.setItem(`wishlist-${ID}`, 'true')
      toast.success('Added to wishlist')
    } else {
      router.push('/login')
      toast.error('Please Login First')
    }

    return; // ⛔ مهم جدًا
  }

  // REMOVE
  const data: CartResponse = await removeWishlistItem(ID)

  if (data.status === 'success') {
    setIsWishlisted(false)
    localStorage.removeItem(`wishlist-${ID}`)
    toast.success('Removed from wishlist')
  } else {
    router.push('/login')
    toast.error('Please Login First')
  }
}




  return (
 <>
 
 


 
 <CardFooter className="flex items-center gap-2 mt-3 px-2 pb-3">

  <Button
    onClick={addproducttocart}
    className="
      flex-1
      h-10
      rounded-full
      flex items-center justify-center gap-2 cursor-pointer bg-[#bf3234]
    "
  >
    {loading ? (
      <span className="vip-spinner"></span>
    ) : (
      <ShoppingCart className="w-5 h-5" />
    )}

    <span className="hidden sm:inline text-sm">
      Add to Cart
    </span>
  </Button>

    <button
      onClick={toggleWishlist}
      className="
        w-10 h-10
        rounded-full
        border
        flex items-center justify-center
        active:scale-90
        transition
      "
    >
      <HeartIcon
        className={`
          w-5 h-5 cursor-pointer
          ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
        `}
      />
    </button>

</CardFooter>

 
 
 
 </>
  )
}
