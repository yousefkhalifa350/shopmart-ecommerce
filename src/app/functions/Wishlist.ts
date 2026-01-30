'use server'

import { Product } from "@/interfaces"
import { GetUserToken } from "../Helpers/GetUserToken"

 export async function addWishlistItem (productId:string) { 

const token = await GetUserToken()
const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist' , 

  {

method:'POST',
body:JSON.stringify({productId}) , 
headers:{
  token:token!,
  
  'content-type':'application/json'
}

 
  })

const data = await response.json()



return data

}


 export async function removeWishlistItem (productId:string) { 

const token = await GetUserToken()
const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+ productId , 

  {

method:'DELETE',

headers:{
  token:token!,

}

 
  })

const data = await response.json()



return data

}








 export async function getWishlistDetails () { 

const token = await GetUserToken()
const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',   {

headers:{
  token:token!,

}

 
  })

const data : Product = await response.json()



return data

}


