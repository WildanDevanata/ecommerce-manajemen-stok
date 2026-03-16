
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    // GOOGLE LOGIN
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // EMAIL LOGIN
    Credentials({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          throw new Error("User tidak ditemukan")
        }

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!valid) {
          throw new Error("Password salah")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })

  ],

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.role = token.role as string
      }

      return session
    }

  },

  pages: {
    signIn: "/signin",
  },

})