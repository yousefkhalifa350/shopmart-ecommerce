import { FailedLoginResponse, successLoginResponse } from "@/interfaces"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions:AuthOptions = { 


providers:[

    CredentialsProvider ({

           name:'Credential',
           credentials:{

                email:{},
                password:{},

           },
            authorize:async (credentials)=>{

                const response = await fetch ('https://ecommerce.routemisr.com/api/v1/auth/signin',{


                    method:"post",
                    body: JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    }),

                    headers:{'content-type':'application/json'}

                })

                //just nickname
                const payload : successLoginResponse|FailedLoginResponse = await response.json()


                if ('token' in payload){

                    

                return {

                    //User
                    //User from Backend
                    //Token from Backend
                    id:payload.user.email,
                    user:payload.user,
                    token:payload.token,
                }

                }else{

                    throw new Error(payload.message)


                }
                  
            }


    })

] , 

callbacks:{


   
    jwt : ({token , user})=> {

 //l Token l khas b ==> (NextAuth) w hankhzno feha
 // user ==>payload(user,token)

        if (user){
            
            token.user= user.user,
            token.token= user.token
        }
            return token

    },

 session: ({session , token})=>{

session.user = token.user

return session


 }

} , 


pages : {

    signIn:'/login',
    error:'/login'

} ,

secret:process.env.NEXTAUTH_SECRET






}
