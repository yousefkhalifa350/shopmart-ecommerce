'use server'
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function GetUserToken(){
    const y = (await cookies()).get('next-auth.session-token')?.value 
    // ||(await cookies()).get('__Secure-next-auth.session-token')?.value
const AccessToken = await decode({token:y,secret:process.env.NEXTAUTH_SECRET!})



return AccessToken?.token

}