export  async function   signup(data:SignupData){


const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',


{method:'POST' , 
   headers:{'Content-Type': 'application/json'},


   body:JSON.stringify(data)
},



)

const result = await response.json()

return result

}