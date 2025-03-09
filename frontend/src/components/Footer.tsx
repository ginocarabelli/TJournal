"use client"
import { Github } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Footer() {
  const pathName = usePathname();
  return (
    <>
    {pathName.includes('/login') ? (
        ""
    ) : pathName.includes('/register') ? "" 
    :
    (
      <footer className='flex w-full justify-center gap-5 bg-neutral-900 p-5'>
        <h1 className='my-auto'>Copyright All rights reserved © Gino Carabelli 2025</h1>
        <Link href="#" target='blank'>
          <p className='my-auto flex gap-1 px-3 py-2 rounded-lg transition duration-300 hover:bg-orange-500'><Github />Github</p>
        </Link>
      </footer>
    )
    }
    </>
  )
}
