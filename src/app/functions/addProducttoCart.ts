"use server"


import { GetUserToken } from "../Helpers/GetUserToken"




//Cart-New
 export async function AddProducttoCart (productId:string) { 


const token = await GetUserToken()
if(!token){
  throw new Error ('You are not authorized to this action')
}
const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart' , 

  {

method:'POST',
body:JSON.stringify({productId}) , 
headers:{
  token: token!,
  
   "Content-Type": "application/json",
}

 
  })

const data = await response.json()

return data

}








//Cart-Old
//  export async function AddProducttoCart (productId:string) { 
// //fetch('https://ecommerce.routemisr.com/api/v1/cart'

// const token = await GetUserToken()
// const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , 

//   {

// method:'POST',
// body:JSON.stringify({productId}) , 
// headers:{
//   token:token!,
  
//    "Content-Type": "application/json",
// }

 
//   })


// return response.json()

// }

















///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// export async function AddProducttoCart(productId: string) {
//   const token = await GetUserToken()

//   if (!token) {
//     throw new Error("No token found")
//   }

//   const response = await fetch(
//     "https://ecommerce.routemisr.com/api/v1/cart",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,
//       },
//       body: JSON.stringify({ productId }),
//     }
//   )

//   if (!response.ok) {
//     const text = await response.text()
//     console.log("Server error:", text)
//     throw new Error("Failed to add product to cart")
//   }

//   return response.json()
// }






