"use client"
import { signIn } from "next-auth/react";
import "@/app/styles/login.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {

    const router = useRouter();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setErrors("");

        const res = await fetch(`
http://bitacoratrading.somee.com/user/register`, {
            method: "POST",
            body: JSON.stringify({
                nombre: name,
                apellido: surname,
                email: email,
                usuario1: username,
                contrasena: password,
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();

        if(!res.ok){
            setErrors(data.error)
            return;
        }
        const responseNextAuth = await signIn("credentials", {
            username, password, redirect: false
        })

        if(responseNextAuth?.error) {
            setErrors(responseNextAuth.error.split(",")[0]);
            return;
        }

        router.push("/dashboard")
    }

    return (
        <main className="main-container w-screen h-screen">
            <form className="form bg-neutral-900 backdrop-blur-xl bg-opacity-50" onSubmit={handleSubmit}>
                <p className="form-title">Sign up an account</p>
                <div className="input-container">
                    <input value={name} placeholder="Enter name" type="text" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <input value={surname} placeholder="Enter last name" type="text" onChange={(e) => setSurname(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <input value={username} placeholder="Enter username" type="text" onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <input value={email} placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <input value={password} placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button className="submit bg-orange-500" type="submit">
                    Sign up
                </button>
                <p className="text-red-500">{errors}</p>
                <p className="signup-link">
                    Have account?
                    <Link href="/login">Sign in</Link>
                </p>
            </form>
        </main>
    );
}