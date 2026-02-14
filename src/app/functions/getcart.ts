'use server'
import { CartResponse } from "@/interfaces"
import { GetUserToken } from "../Helpers/GetUserToken"


//ver2
export async function GetCartItem(): Promise<CartResponse | null> {
  try {
    const token = await GetUserToken()

    if (!token) {
      return null
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        headers: {
          token:token!,
        }
      }
    )

    if (!response.ok) {
      return null
    }

    const data: CartResponse = await response.json()
    console.log(data);
    
    return data
  } catch(error) {
 
    return null
  }
}




//  export async function AddProducttoCart (productId:string) { 


// const token = await GetUserToken()
// if(!token){
//   throw new Error ('You are not authorized to this action')
// }
// const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart' , 

//   {

// method:'POST',
// body:JSON.stringify({productId}) , 
// headers:{
//   token: token!,
  
//    "Content-Type": "application/json",
// }

 
//   })

// const data = await response.json()

// return data

// }





//ver1
//  export async function GetCartItem() { 

// const token = await GetUserToken()

//   if (!token) {
//     return null
//   }
  
// const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , 
//         {

//             headers:{
//                  token:token!,
//             }

//         }

//     )

// const data : CartResponse  = await response.json()

// return data



// }
