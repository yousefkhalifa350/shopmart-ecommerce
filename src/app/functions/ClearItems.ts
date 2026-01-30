'use client'

import { GetUserToken } from "../Helpers/GetUserToken"


export async function ClearItemS () { 

const token = await GetUserToken()

 const response = await  fetch('https://ecommerce.routemisr.com/api/v1/cart' , {


  method:'DELETE', 

headers:{token:token!}

 }

 )


 return response.json()


}
