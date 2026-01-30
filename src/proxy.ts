import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart' , '/profile']
const authPages      = ['/login' , '/register']
                                    //Window Search
export default async function proxy(req:NextRequest){


const token = await getToken({req})
//if user write cart ?
if(protectedPages.includes(req.nextUrl.pathname)){

    if(token){
        return NextResponse.next()
    }else   {

       const redirecturl =  new URL ('/login' , process.env.NEXTAUTH_URL)

         return NextResponse.redirect(redirecturl)          
     }


}



if(authPages.includes(req.nextUrl.pathname)){
       const redirecturl =  new URL ('/' , process.env.NEXTAUTH_URL)

    if(token){

         return NextResponse.redirect(redirecturl)          

    }else   {

        return NextResponse.next()

     }


}



return NextResponse.next()

}