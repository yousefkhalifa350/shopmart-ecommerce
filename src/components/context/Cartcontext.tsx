'use client'
import { GetCartItem } from '@/app/functions/getcart';
import { CartResponse } from '@/interfaces';
import React, { createContext, ReactNode, useEffect, useState } from 'react'




export const cartcontext = createContext<{

cartdata:CartResponse | null , 
setCartdata : (value:CartResponse | null) => void,
setIsloading : (value:boolean)=> void , 
isloading:boolean,
Getcart:()=> void,
cartownerID:string | null,
setCartownerID:(value:string | null)=>void
}>



({
    cartdata:null,
    setCartdata:()=> {} , 
    isloading:false,
    setIsloading:()=> {},
    Getcart:()=>{},
    cartownerID:null,
    setCartownerID:()=>{},
})


export default function CartContextProvider ({ children } : {children:ReactNode}) {



//                                       Generic Required!            
const [cartdata, setCartdata] = useState<CartResponse|null>(null)
const [cartownerID,setCartownerID]=useState<string|null>(null)
const [isloading, setIsloading] = useState(true)


useEffect(()=> {

    Getcart()

}, [])

// useEffect(() => {
//   const savedID = localStorage.getItem('cartOwnerID')

//   if (savedID) {
//     setCartownerID(savedID)
//   }
// }, [])



async function Getcart () { 
  
  setIsloading(true)

const response: CartResponse | null = await GetCartItem()

  // setCartdata(response)

  const id = response?.data?.cartOwner

  if (id) {
    // 1️⃣ في الذاكرة (Client)
    setCartownerID(id)

    // 2️⃣ في Cookie (Server يشوفه)
    document.cookie = `cartOwnerID=${id}; path=/; max-age=86400`
  }

setCartdata(response)

  setIsloading(false)
}





return <cartcontext.Provider value={{cartdata , setCartdata , isloading , setIsloading , Getcart , cartownerID , setCartownerID}}>

    {children}

</cartcontext.Provider>


}



