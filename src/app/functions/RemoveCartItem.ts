'use client'

import { GetUserToken } from "../Helpers/GetUserToken"

//Cart-New
export async function RemoveCartItem (productID:string) { 

const token = await GetUserToken()

const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productID}`  ,{

    
method:'DELETE', 

headers:{
  token:token!
}



})


if (!response.ok) {
  return { status: 'fail' }
}

if (response.status === 204) {
  return { status: 'success' }
}

return response.json();




}



//Old-cart
// export async function RemoveCartItem (productID:string) { 

// const token = await GetUserToken()

// const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productID ,{

    
// method:'DELETE', 

// headers:{
//   token:token!
// }



// })

// return response.json();



// }