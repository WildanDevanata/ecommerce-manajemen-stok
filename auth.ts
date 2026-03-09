import NextAuth from "next-auth"
import Google from "next-auth/providers/google" 
import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  }
})