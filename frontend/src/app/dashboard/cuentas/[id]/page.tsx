"use server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCuentasId, getStatsPnlPeriod, getTradesCuenta } from '@/app/lib/data';
import { ChartStats } from '@/components/ChartsStats';
import DaysTraded from '@/components/DaysTraded';
import LastTrades from '@/components/LastTrades';
import TradesStats from '@/components/TradesStatsCompo';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import "@/app/styles/dashboard.css"

export default async function ViewCuenta({ params } : { params : { id: string }}) {
    
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const trades = await getTradesCuenta(session.user.token, id);
    const cuenta = await getCuentasId(session.user.token, id)
    const pnl = await getStatsPnlPeriod(session.user.token, id, 2)
    console.log(pnl)

    return (
        <div className='w-auto my-12 px-5'>
            {trades.length > 0 ? (
                <div className="flex flex-col gap-3 text-white font-semibold">
                    <h3 className="mx-2">Account statistics: <span className='mx-2 rounded-lg bg-blue-800 px-3 py-2'>{cuenta.empresa} - $ {cuenta.tamanio}</span></h3>
                    <div className="create-trade flex justify-between mt-3 mx-2">
                        <Link className="bg-green-500 px-3 py-2 font-bold rounded-lg" href="/dashboard/trades/create">Create Trade</Link>
                        <Link className="bg-red-500 px-3 py-2 font-bold rounded-lg" href="/dashboard">Back</Link>
                    </div>
                    <div className="stats-container">
                        <LastTrades trades={trades} session={session}/>
                        <DaysTraded trades={trades} session={session}/>
                        <TradesStats trades={trades} session={session} accountId={id} period={2}/>
                        <ChartStats chartData={pnl} period={2}/>
                    </div>
                </div>
            ) : (
                <div className="m-auto p-10 w-full flex flex-col gap-3 text-white">
                    <div className="message flex flex-col w-full gap-3">
                        <h1 className="m-auto">You dont have registered trades in this account yet.</h1>
                        <div className="buttons mx-auto flex gap-3">
                            <Link className="bg-green-500 px-3 py-2 font-bold rounded-lg" href="/dashboard/trades/create">Create Trade</Link>
                            <Link className="bg-red-500 px-3 py-2 font-bold rounded-lg" href="/dashboard/cuentas">Back</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}
