 import { userResponse } from "@/interfaces"
import NextAuth , {User} from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */


    //Update on the Session Orignal from NextAuth
    //bykon bl shakl da
  interface Session {

    user:userResponse

  }
   

  //Update on the User Orignal from NextAuth
  //bykon bl shakl da
  interface User{

    user:userResponse,
    token:string,

  }

}


//l shakl l haytshfr l data zyoo (zy meenn ?? )
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User{}
}