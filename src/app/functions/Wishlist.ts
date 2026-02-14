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
  
          "Content-Type": "application/json",
}

 
  })

   return await response.json()

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

   return await response.json()

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

















// export async function addWishlistItem(productId: string) {
//   const token = await GetUserToken()

//   if (!token) {
//     throw new Error("User not authenticated")
//   }

//   const response = await fetch(
//     'https://ecommerce.routemisr.com/api/v1/wishlist',
//     {
//       method: 'POST',
//       headers: {
//         token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productId }),
//       cache: 'no-store',
//     }
//   )

//   if (!response.ok) {
//     const error = await response.text()
//     console.log(error)
//     throw new Error("Failed to add wishlist item")
//   }

//   return await response.json()
// }




// export async function removeWishlistItem(productId: string) {
//   const token = await GetUserToken()

//   if (!token) {
//     throw new Error("User not authenticated")
//   }

//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
//     {
//       method: 'DELETE',
//       headers: { token },
//       cache: 'no-store',
//     }
//   )

//   if (!response.ok) {
//     const error = await response.text()
//     console.log(error)
//     throw new Error("Failed to remove wishlist item")
//   }

//   return await response.json()
// }





// export async function getWishlistDetails(): Promise<Product[]> {
//   const token = await GetUserToken()

//   if (!token) {
//     throw new Error("User not authenticated")
//   }

//   const response = await fetch(
//     'https://ecommerce.routemisr.com/api/v1/wishlist',
//     {
//       headers: { token },
//       cache: 'no-store',
//     }
//   )

//   if (!response.ok) {
//     const error = await response.text()
//     console.log(error)
//     throw new Error("Failed to get wishlist")
//   }

//   const data = await response.json()
//   return data.data
// }