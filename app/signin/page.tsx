import {LoginGoogleButton} from "@/components/shared/login-button";
import { Metadata } from "next";

export const metadata: Metadata = { 
    title: "Sign In - E-Commerce",  
    description: "Sign in to your account to access exclusive features and personalized shopping experience on our e-commerce platform.",
};

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">     
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <p className="font-medium mb-5 text-gray-500">Sign In Your Account</p>
            <LoginGoogleButton /> 
        </div>
    </div>
    );
    };

export default SignInPage;