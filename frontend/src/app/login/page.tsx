"use client"
import { signIn } from "next-auth/react";
import "@/app/styles/login.css"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

export default function Login() {

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true)
        const responseNextAuth = await signIn("credentials", {
            username, password, redirect: false
        })
        if(responseNextAuth?.error) {
            setIsLoading(false)
            setErrors(responseNextAuth.error.split(","));
            return;
        }
        router.push("/dashboard")
    }

    return (
        <main className="main-container h-screen">
            {isLoading ? (<Loader/>)
            :
            (
            <form className="form bg-neutral-900 backdrop-blur-xl bg-opacity-50" onSubmit={handleSubmit}>
                <p className="form-title">Sign in to your account</p>
                <div className="inputs">
                    <div className="input-container">
                        <input value={username} placeholder="Enter username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <input value={password} placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <button className="submit bg-orange-500" type="submit">
                    Sign in
                </button>
                <p className="text-red-500">{errors}</p>
                <p className="signup-link">
                    No account?
                    <Link href="/register">Sign up</Link>
                </p>
            </form>
            )}
        </main>
    );
}