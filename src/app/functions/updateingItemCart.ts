'use client'

import { GetUserToken } from "../Helpers/GetUserToken"



export async function updateingItemCart (productID:string ,count:number ){


const token = await GetUserToken()
const response = await fetch ('https://ecommerce.routemisr.com/api/v1/cart/'+ productID,

  {

method:'PUT',

body:JSON.stringify({count}),

headers:  {

token:token!,
'content-type':'application/json'}

  },


)


return response.json()

}