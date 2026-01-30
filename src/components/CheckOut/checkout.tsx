'use client'

import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
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
import { GetUserToken } from '@/app/Helpers/GetUserToken'
import { Router } from 'next/router'
import toast from 'react-hot-toast'
export default function Checkout({cartID}:{cartID:string}) {

    let detailsInput=useRef<HTMLInputElement | null>(null)
    let cityInput=useRef<HTMLInputElement | null>(null)
    let phoneInput=useRef<HTMLInputElement | null>(null)


    async function checkoutSession(){
    
const token = await GetUserToken()


      const shippingAddress = {
    
        details:detailsInput.current?.value,
        city:cityInput.current?.value,
        phone:phoneInput.current?.value
    
      }
    
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,{
     
    method:'POST',
    body:JSON.stringify({shippingAddress}) , 
    
    
      headers:{token:token!
          ,'content-type':'application/json'
    
        }
    
     })
    
     const data = await response.json()
    
     console.log(data);
     
     if (data.status=='success'){
    
        window.location.href=data.session.url

     }
    
    }







async function cashorder (cartID:any) { 

console.log(cartID,'check');

 const shippingAddress = {
    
        details:detailsInput.current?.value,
        city:cityInput.current?.value,
        phone:phoneInput.current?.value
    
      }

const token = await GetUserToken()

const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/'+cartID,{

method:'POST',
body:JSON.stringify({shippingAddress}) ,

headers:{token:token! , 'content-type':'application/json'}

})


const data = await response.json()

console.log(data);

if(data.status=='success'){


  toast.promise(
  cashorder(cartID),
   {
     loading: 'Saving...',
     success: <b> Your order is confirmed Thank you!</b>,
     error: <b>Could not save.</b>,
   }
 )

 setTimeout(() => {
  
   window.location.href = '/allorders'
   
 }, 1500);

}

}








  return (

<>

  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="w-full">Proceed to Checkout</Button>
    </SheetTrigger>


   <SheetContent>
      <SheetHeader>
        <SheetTitle>Add Address</SheetTitle>
        <SheetDescription className='text-muted-foreground'>
Add a shipping address for your deliveries.
        </SheetDescription>
      </SheetHeader>

      <div className="grid gap-6 px-4">

        <div className="grid gap-3">
          City:
          <input ref={cityInput} id="city"  className="border rounded-md p-2" />
        </div>

        <div className="grid gap-3">
          Details:
          <input ref={detailsInput} id="details"    className="border rounded-md p-2" />
        </div>

          <div className="grid gap-3">
          Phone Number:
          <input ref={phoneInput} id="phone"  className="border rounded-md p-2" />
        </div>

      </div>

      <SheetFooter>
        <Button onClick={()=>checkoutSession()} type="submit" >Visa</Button>
        <Button onClick={()=>cashorder(cartID)} type="submit" >Cash</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>

  </Sheet>








</>









)
}
