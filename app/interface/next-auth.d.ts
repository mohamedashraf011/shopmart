import { email } from 'zod';
import NextAuth from "next-auth"

declare module "next-auth" {
interface User {
    user:{
        name: string
        email: string
        role: string
    },
    token: string
    }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends User{
        /** OpenID ID Token */
        idToken?: string
    }
}