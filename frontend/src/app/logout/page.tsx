"use client"
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Loader } from '@/components/ui/loader';

export default function LogOut() {
  useEffect(() => {
    signOut({
    redirect: true,
    callbackUrl: '/login',
    });
  }, []);

  return (
    <div className="w-screen h-screen grid content-center">
      <Loader />
    </div>
  );
}
