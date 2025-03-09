import "@/app/styles/dashboard.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/utils";
import { getCuentas, getStatsPnlPeriod, getTrades } from "../lib/data";
import Link from "next/link";
import DaysTraded from "@/components/DaysTraded";
import LastTrades from "@/components/LastTrades";
import TradesStats from "@/components/TradesStatsCompo";
import { ChartStats } from "@/components/ChartsStats";
import SelectCuenta from "@/components/SelectAccount";
import { IPnl } from "../lib/definitions";
import { Suspense } from "react";
import LastTradesSkeleton from "@/components/skeletons/LastTradesSkeleton";
import DaysTradedSkeleton from "@/components/skeletons/DaysTradedSkeleton";
import TradesStatsSkeleton from "@/components/skeletons/TradesStatsSkeleton";
import { ChartStatsSkeleton } from "@/components/skeletons/ChartsStatsSkeleton";
export default async function Dashboard() {

    const session = await getServerSession(authOptions)
    const user = session.user.user;
    const cuentas = await getCuentas(session.user.token, session.user.user.idUsuario);
    const trades = await getTrades(session.user.token, session.user.user.idUsuario)
    const pnl : IPnl[] = await getStatsPnlPeriod(session.user.token, 0, 2)
    console.log(session)

    function calculatePeriod(period : number) {
        
        const now = new Date()
        const today = now.toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })
        const lastMonth = new Date(now);
        if(period === 1) {
            lastMonth.setDate(now.getDate()-7);
        } else if (period === 2){
            lastMonth.setMonth(now.getMonth()-1);
        } else {
            lastMonth.setFullYear(now.getFullYear()-1);
        }
        const since = lastMonth.toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" });
        return `${since} - ${today}`;
    }

    return (
        <div className="w-auto my-12">
            {cuentas.length > 0 ? (
                <main className="mx-5 w-full h-full flex flex-col gap-3 text-white font-semibold">
                    <h1 className="my-auto"><strong>{user.nombre}</strong>&apos; Dashboard</h1>
                    <SelectCuenta cuentas={cuentas} />
                    <div className="stats-container">
                        <Suspense fallback={<LastTradesSkeleton/>}>
                            <LastTrades trades={trades} session={session}/>
                        </Suspense>
                        <Suspense fallback={<DaysTradedSkeleton/>}>
                            <DaysTraded trades={trades}/>
                        </Suspense>
                        <Suspense fallback={<TradesStatsSkeleton/>}>
                            <TradesStats trades={trades} session={session} accountId={0} period={3}/>
                        </Suspense>
                        <Suspense fallback={<ChartStatsSkeleton/>}>
                            <ChartStats chartData={pnl} period={calculatePeriod(2)}/>
                        </Suspense>
                    </div>
                </main>
            ) : (
                <main className="w-full h-screen flex flex-col p-10">
                    <h1>Dashboard de <strong>{user.nombre}</strong></h1>
                    <div className="w-full flex flex-col gap-3 m-auto">
                        <h1 className="m-auto">You dont have accounts registered yet.</h1>
                        <Link className="bg-green-500 px-3 py-2 mx-auto font-bold rounded-lg" href={`/dashboard/cuentas/create`}>Create Account</Link>
                    </div>
                </main>
            )}
        </div>
    )
}
