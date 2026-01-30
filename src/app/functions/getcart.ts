'use client'
import { CartResponse } from "@/interfaces"
import { GetUserToken } from "../Helpers/GetUserToken"


 export async function GetCartItem() { 

const token = await GetUserToken()

// const response = await fetch(`${'https://ecommerce.routemisr.com/api/v1'}/cart` , 
const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , 
        {

            headers:{
                 token:token!,
            }

        }

    )

const data : CartResponse  = await response.json()

return data








// try {
//     const token = await GetUserToken()

//     const response = await fetch(
//       'https://ecommerce.routemisr.com/api/v1/cart',
//       {
//         headers: {
//           token: token!,
//         },
//       }
//     )

//     const data: CartResponse = await response.json()
//     return data
//   } catch {
//     return null
//   }








}
