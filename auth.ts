import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client" // Import Enum Role langsung dari Prisma

// --- MODULE AUGMENTATION ---
declare module "next-auth" {
  interface Session {
    user: {
      role: Role // Gunakan tipe Role dari Prisma
    } & DefaultSession["user"]
  }

  interface User {
    role?: Role // Gunakan tipe Role dari Prisma
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // GOOGLE LOGIN
    Google({
clientId: process.env.GOOGLE_CLIENT_ID, // Pastikan namanya sama persis dengan di .env
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: Role.CUSTOMER, // Otomatis menjadi CUSTOMER saat signup Google
        }
      },
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
          role: user.role // Ini akan mengembalikan ADMIN atau CUSTOMER
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as Role
      } else if (token.email && !token.role) {
        // Fallback jika session jwt butuh refresh role dari database
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true }
        })
        if (dbUser) token.role = dbUser.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as Role
      }
      return session
    }
  },

  pages: {
    signIn: "/signin",
  },
})