'use server'

import { GetUserToken } from "../Helpers/GetUserToken"


//New-Cart
export async function ClearItemS () { 

const token = await GetUserToken()

 const response = await  fetch('https://ecommerce.routemisr.com/api/v2/cart' , {


  method:'DELETE', 

headers:{token:token!}

 }

 )



return response.json()


}











//Old-Cart
// export async function ClearItemS () { 

// const token = await GetUserToken()

//  const response = await  fetch('https://ecommerce.routemisr.com/api/v1/cart' , {


//   method:'DELETE', 

// headers:{token:token!}

//  }

//  )


//  return response.json()


// }