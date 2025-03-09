import "@/app/styles/trades.css"
import TradesCompo from "@/components/TradesCompo";
import TradesStatsCompo from "@/components/TradesStatsCompo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getCuentas, getTrades } from "@/app/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import TradesStatsSkeleton from "@/components/skeletons/TradesStatsSkeleton";
import TradesCompoSkeleton from "@/components/skeletons/TradesCompoSkeleton";

export default async function Trades() {

    const session = await getServerSession(authOptions);
    const user = session.user.user;
    const trades = await getTrades(session.user.token, session.user.user.idUsuario);
    const cuentas = await getCuentas(session.user.token, session.user.user.idUsuario)
    return (
        <div className="w-auto my-12">
        {trades.length > 0 ? (
            <div className="my-12 px-10 w-full flex flex-col gap-3 text-white">
                <h3 className="mx-2"><strong>{user.nombre}</strong>'s Trades</h3>
                <div className="create-trade m-2">
                    <Link className="bg-orange-500 p-3 m-auto font-bold rounded-lg" href="/dashboard/trades/create">Create Trade</Link>
                </div>
                <div className="parent my-3 w-full h-full flex flex-col gap-5">
                    <Suspense fallback={<TradesStatsSkeleton/>}>
                        <TradesStatsCompo trades={trades} session={session} accountId={0} period={2}/>
                    </Suspense>
                    <Suspense fallback={<TradesCompoSkeleton/>}>
                        <TradesCompo session={session} cuentas={cuentas} trades={trades}/>
                    </Suspense>
                </div>
            </div>  
        ) : (
            <div className="p-10 w-full flex flex-col gap-3">
                <h3 className="mx-2">Trades de <strong>{user.nombre}</strong></h3>
                <div className="parent m-auto">
                {cuentas.length > 0 ? (
                    <div className="message flex flex-col w-full gap-3">
                        <h1 className="m-auto">You dont have registered trades yet.</h1>
                        <Link className="bg-green-500 px-3 py-2 m-auto font-bold rounded-lg" href="/dashboard/trades/create">Create Trade</Link>
                    </div>
                ) : (
                    <div className="message flex flex-col w-full gap-3">
                        <h1 className="m-auto">You should first create an account.</h1>
                        <Link className="bg-green-500 px-3 py-2 m-auto font-bold rounded-lg" href={`/dashboard/cuentas/create`}>Create Account</Link>
                    </div>
                )}
                </div>
            </div>
        )}
        </div>
    )
}