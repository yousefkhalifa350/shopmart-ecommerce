'use client'

import { GetUserToken } from "../Helpers/GetUserToken"

export async function RemoveCartItem (productID:string) { 

const token = await GetUserToken()

const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productID ,{

    
method:'DELETE', 

headers:{
  token:token!
}



})

return response.json();



}