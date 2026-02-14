'use client'
import React, { useContext, useEffect, useState } from 'react'
import test from '../../..//..//public//next.svg'
import { cartcontext } from '@/components/context/Cartcontext'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import Loading from '@/app/loading'
import { CartResponse } from '@/interfaces'
import toast from 'react-hot-toast'
import {  Loader, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { updateingItemCart } from '@/app/functions/updateingItemCart'
import { RemoveCartItem } from '@/app/functions/RemoveCartItem'
import { ClearItemS } from '@/app/functions/ClearItems'
import Checkout from '@/components/CheckOut/checkout'
import { GetUserToken } from '@/app/Helpers/GetUserToken'

//Start Coding


export default function Cart() {

  

const {cartdata , isloading , Getcart , setCartdata , setIsloading} = useContext(cartcontext)
//                                           Genreic!
const [removingId, setRemovingId] = useState<string|null>(null)
const [updateingID, setUpdateingID] = useState<string|null>(null)
const [isclearing, setIsclearing] = useState<boolean>(false)




useEffect(() => {

  
  const load = async () => {

     setIsloading(true);  
if (typeof cartdata?.data?.products[0]?.product=='string'|| cartdata==null)  {

  Getcart()



  
}

      setIsloading(false);  
  
  };

  load();
  
}, []);





useEffect(()=>{


Getcart()

  
},[])







async function updateingItem (productID:string ,count:number ){


setUpdateingID(productID)  

const data:CartResponse = await  updateingItemCart(productID , count)



if(data.status=='success'){
  setCartdata(data)
  toast.success('Product Updateing Succesuflly')
  
}

setUpdateingID(null)

}





async function removeitem (productID:string) { 

setRemovingId(productID)

const data:CartResponse = await RemoveCartItem(productID)


if(data.status=='success'){
  setCartdata(data)
  toast.success('Product Deleted Successfulyy')

}


  setRemovingId(null)


}




async function clearItem () { 

setIsclearing(true)

const data:CartResponse = await ClearItemS()

setIsclearing(false)
if (data.status === 'success') {
  setCartdata(data)
  toast.success('Cart Cleared Successfully')
}



}




  
  return (




    <>

      {/* Title */}

    
{isloading || typeof cartdata?.data?.products[0]?.product=='string' ?  <div className='min-h-screen flex justify-center items-center'> 
    
    <span className='vip-spinner-page'></span>
    
    </div>:


cartdata?.numOfCartItems! > 0 ? 
<div className="container mx-auto py-6 px-4 flex flex-col lg:flex-row gap-6 ">



<div className=" gap-6 w-full lg:w-[65%] flex-1">


     <div className="div ">
       <div className="text-[#0A0A0A] font-black tracking-tight text-3xl">
    Shopping Cart
  </div>

<p className="text-muted-foreground mt-1">
    {cartdata?.numOfCartItems}.Items in your cart
  </p>
     </div>



  {/* Car Item 1==>Loop*/}
{cartdata?.data.products.map((item)=><div className="
    rounded-xl p-4 border mt-5
    flex flex-col lg:flex-row gap-6
    transition-all duration-300
    hover:shadow-xl
    hover:-translate-y-1
  " key={item._id}>
    {/* Image */}
    <div className="overflow-hidden rounded-lg">
                    <img src={item.product.imageCover}
    alt={item.product.imageCover}
    className="
      w-24 h-24 object-cover md:w-28
      transition-transform duration-300
      hover:scale-105
    "/>

    </div>

    {/* Info */}
    <div className="flex flex-col justify-between flex-1 gap-2">
      <h3 className="font-semibold text-lg">{item.product.title}</h3>
      <p className="text-muted-foreground">
        {item.product.brand?.name}.
        {item.product.category?.name}

      </p>

      {/* +/- */}
<div className="flex flex-col sm:flex-col md:flex-row items-center gap-2 mt-2 lg:mt-0">

  {/* Button - */}
  <button disabled={item.count==1} onClick={()=>updateingItem(item.product._id , item.count-1)} className="
    rounded-lg border border-gray-400 hover:bg-accent
    flex items-center justify-center
    w-full md:w-16 lg:w-10
    py-2
    sm:rounded-md lg:rounded-lg
  cursor-pointer">
    -
  </button>

  {/* Count */}
<span className="w-8 h-8 flex items-center justify-center font-medium 
                 bg-gray-200 rounded-full 
                 hover:bg-accent hover:text-black transition-colors duration-200">

 {updateingID==item.product.id ? <span className='vip-spinner'></span> :  item.count}


</span>
  {/* Button + */}
  <button onClick={()=>updateingItem(item.product._id , item.count+1)} className="
    rounded-lg border border-gray-400 hover:bg-accent
    flex items-center justify-center
    w-full md:w-16 lg:w-10
    py-2
    sm:rounded-md lg:rounded-lg
  cursor-pointer">
    +
  </button>

</div>

    </div>

    {/* Price & Remove */}
    <div className="flex flex-col items-end justify-between mt-4 lg:mt-0">
      <div className="font-semibold flex items-center justify-center w-full md:w-16 lg:w-10 space-x-1">
      <span>EGB</span>  
      
      
      <span>{item.price}</span>
      
      
      
      </div>
      <div className="text-muted-foreground text-sm flex items-center justify-center
    w-full md:w-16 lg:w-10">each</div>

      <button onClick={()=>removeitem(item.product._id)} className=" font-semibold text-red-600
    mt-2 ml-auto
    w-full
    transition
    hover:text-red-800
    hover:underline cursor-pointer flex items-center justify-center">
{ removingId==item.product._id ? <span className='vip-spinner'></span>: <span>Remove</span>}
      
      </button>
    </div>
  </div>)}



</div>




{/* Check out / Order Summary */}
<div className="w-full lg:w-[30%] rounded-xl p-4 shadow-sm border mt-6 lg:mt-0 sticky top-40 self-start">
  <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

  <div className="flex justify-between mb-1">
    <span className="text-muted-foreground">Subtotal ({cartdata?.numOfCartItems} items)</span>
    <span>{cartdata?.data.totalCartPrice} EGP</span>
  </div>

  <div className="flex justify-between mb-4">
    <span className="text-muted-foreground">Shipping</span>
    <span className='text-green-700 hover:text-green-900'>Free</span>
  </div>

<Link href={'/products'}>

  <Button className="w-full mb-2 ">Continue Shopping</Button>

</Link>


<Checkout cartID={cartdata?.cartId!}/>




<Button onClick={clearItem} className="cursor-pointer w-full mb-2 mt-2 bg-white text-red-600 font-semibold border 
  hover:bg-[#F8326C] hover:text-white
  transition-all duration-400">
 
{isclearing ? <span className='vip-spinner'></span> : <span>Clear</span>}

</Button>



</div>


</div> :



<div className="flex flex-col items-center justify-center py-20 text-center">
  

  <h1 className="text-3xl font-bold text-gray-800 mb-2">
    Your Cart is Empty 🛒
  </h1>


  <p className="text-gray-500 mb-6 max-w-md">
    Looks like you haven’t added anything to your cart yet.
    Start shopping and add your favorite products.
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
  Add Products to Cart
  </Link>

</div>


}

    
    


    
    
    </>
  )
}
