"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation";
import { ChartArea, CircleUserRound, House, LogIn, LogOut, Wallet } from "lucide-react";

export default function Navbar() {
    const pathName = usePathname();
    
    const {data: session} = useSession();

    return (
        <>
            {pathName === '/' ? (
                <header className="backdrop-blur-[10px] md:backdrop-blur-0 w-full overflow-visible z-[99999] py-6">
                    <div className="flex items-center justify-center w-auto mx-auto text-white gap-x-10">
                        <div className="left-side">
                        <Link href='/logout' className="text-3xl font-black"><span className="text-orange-500">T</span>Journal</Link>
                        </div>
                        <Link href='#' className="transition duration-300 hover:bg-orange-500 flex justify-center align-middle rounded-md p-2">Documentation</Link>
                        <div className="right-side w-auto">
                        {session?.user ? (
                            <div className="flex bg-neutral-900 px-4 py-3 gap-5 rounded-lg">
                                <Link href="/dashboard" 
                                    className={`transition duration-300 hover:bg-orange-500 px-3 py-2 flex justify-center my-auto rounded-md`}>
                                    Dashboard
                                </Link>
                                <Link href='/logout' className="transition duration-300 hover:bg-red-500 px-3 py-2 flex justify-center align-middle rounded-md p-2">Sign Out</Link>
                            </div>
                        ): (
                            <div className="flex gap-7 w-auto bg-neutral-900 px-4 py-3 gap-5 rounded-lg">
                                <Link href='/login' className="flex justify-center align-middle rounded-md p-2 transition duration-300 hover:bg-orange-500">Log In</Link>
                                <Link href='/register' className="flex justify-center align-middle rounded-md p-2 transition duration-300 hover:bg-green-500">Sign Up</Link>
                            </div>
                        )}
                        </div>
                    </div>
                </header>
            ) : (
                <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl rounded-b-xl z-50 bg-neutral-900 text-white p-4 shadow-md">
                    <nav>
                        <ul className="flex justify-center gap-5">
                            <Link href="/dashboard" 
                                className={`size-12 flex justify-center align-middle rounded-md ${pathName === '/dashboard' ? 'bg-orange-500' : 'bg-neutral-800'}`}>
                                    <House className="my-auto"/>
                            </Link>
                            <Link href="/dashboard/trades" 
                                className={`size-12 flex justify-center align-middle rounded-md ${pathName.includes('/dashboard/trades') ? 'bg-orange-500' : 'bg-neutral-800'}`}>
                                    <ChartArea className="my-auto" />
                                </Link>
                            <Link href="/dashboard/cuentas" 
                                className={`size-12 flex justify-center align-middle rounded-md ${pathName.includes('/dashboard/cuentas') ? 'bg-orange-500' : 'bg-neutral-800'}`}>
                                    <Wallet className="my-auto"/>
                                </Link>
                            <Link href="/dashboard/configuracion" className={`size-12 flex justify-center align-middle rounded-md ${pathName.includes('/dashboard/configuracion') ? 'bg-orange-500' : 'bg-neutral-800'}`}>
                                <CircleUserRound className="my-auto" />
                            </Link>
                            {session?.user ? 
                            (<Link href="/dashboard" className="size-12 flex justify-center align-middle rounded-md bg-red-500 hover:bg-red-700" onClick={() => signOut()}>
                                <LogOut className="my-auto"/>
                            </Link>)
                            :
                            (<Link href="/dashboard" className="size-12 flex justify-center align-middle rounded-md bg-red-500 hover:bg-red-700" onClick={() => redirect('/login')}>
                                <LogIn className="my-auto"/>
                            </Link>)
                            }
                        </ul>
                    </nav>
                </div>
            )}   
            
        </>
    );
}