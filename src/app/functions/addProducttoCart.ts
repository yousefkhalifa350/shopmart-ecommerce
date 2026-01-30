'use client'

import { GetUserToken } from "../Helpers/GetUserToken"

 export async function AddProducttoCart (productId:string) { 

const token = await GetUserToken()
const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , 

  {

method:'POST',
body:JSON.stringify({productId}) , 
headers:{
  token:token!,
  
  'content-type':'application/json'
}

 
  })


return response.json()

}