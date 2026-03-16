"use client"

import { FaGoogle } from "react-icons/fa6"
import { signIn } from "next-auth/react"

export const LoginGoogleButton = () => {

  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/"
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 
      bg-gradient-to-r from-pink-400 to-pink-500 
      text-white font-semibold py-3 rounded-lg 
      hover:from-pink-500 hover:to-pink-600 
      transition-all shadow-md"
    >
      <FaGoogle className="text-white text-lg" />
      Login with Google
    </button>
  )
}