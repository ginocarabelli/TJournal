import "@/app/styles/cuentas.css"
import CuentasCompo from "@/components/CuentasCompo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/utils";
import { getCuentas } from "@/app/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import CuentasCompoSkeleton from "@/components/skeletons/CuentasCompoSkeleton";

export default async function Cuentas() {

    const session = await getServerSession(authOptions)
    const cuentas = await getCuentas(session.user.token, session.user.user.idUsuario)
    const user = session.user.user;

    return (
        <>
        {cuentas.length !== 0 ? (
            <div className="my-12 p-10 h-full w-full flex flex-col gap-3 text-white font-semibold">
                <h1><strong>{user.nombre}</strong>&apos;s Accounts</h1>
                <div className="cuentas-container flex flex-col gap-7">
                    <div id="crudCuentas" className="my-2">
                        <Link className="bg-orange-500 p-3 gap-3 rounded-lg" href="/dashboard/cuentas/create">Create Account</Link>
                    </div>
                    <div className="rounded-xl py-10 h-full" id="cuentas">
                        <h3>All Accounts</h3>
                        <Suspense fallback={<CuentasCompoSkeleton />}>
                            <CuentasCompo
                                cuentas={cuentas}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        ) : (
            <div className="p-10 w-full flex flex-col gap-3">
                <h3 className="mx-2">Accounts de <strong>{user.nombre}</strong></h3>
                <div className="parent m-auto">
                    <div className="message flex flex-col w-full gap-3">
                        <h1 className="m-auto">You dont have registered accounts yet.</h1>
                        <Link className="bg-green-500 px-3 py-2 m-auto font-bold rounded-lg" href="/dashboard/cuentas/create">Create Account</Link>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}