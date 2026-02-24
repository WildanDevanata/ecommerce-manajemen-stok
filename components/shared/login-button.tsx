import { signIn } from "@/auth"
import {FaG, FaGoogle} from "react-icons/fa6"

export const LoginGoogleButton = () => {
  return (
    <form action={async()=>{
        "use server"
        await signIn("google");
    }}
    >
    <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition cursor-pointer">
        <FaGoogle className="text-red-500 size-6" />
        Sign In With Google
    </button>
    </form>
    
  );
};

