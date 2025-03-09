import { getCuentas } from '@/app/lib/data'
import React from 'react'

export default async function LastTrades({ session, trades }) {

    const cuentas = await getCuentas(session.user.token, session.user.user.idUsuario)

    return (
        <div className="ultimos-trades bg-neutral-950 rounded-xl w-full mx-auto p-5" id="ultimosTrades">
            <h3>
                Last Trades
            </h3>
            <div className="trades-container p-5 rounded-lg h-4/5 overflow-y-scroll">
                {trades.length > 0 ? (
                    <div className="last-trades flex flex-col">
                        <div className="header grid grid-cols-7 mb-3 px-3">
                            <p>Date</p>
                            <p>Type</p>
                            <p>Currency</p>
                            <p>Entry</p>
                            <p>Exit</p>
                            <p>PNL</p>
                            <p>Account</p>
                        </div>
                        <div className='rows'>
                            {trades
                                .sort((a, b) => new Date(b.fechaEntrada).getTime() - new Date(a.fechaEntrada).getTime())
                                .map(t => (
                                <div key={t.idTrade} className='bg-neutral-900 col-span-4 grid grid-cols-7 p-3 mt-2 rounded-lg'>
                                    <p>{t.fechaEntrada.toString().slice(0,10)}</p>
                                    <p className={t.idTipoTrade === 1 ? "text-green-500" : "text-red-500"}>{t.idTipoTrade === 1 ? "LONG" : "SHORT"}</p>
                                    <p>{t.divisa}</p>
                                    <p>{t.precioEntrada.toFixed(2)}</p>
                                    <p>{t.precioSalida.toFixed(2)}</p>
                                    <p className={t.dineroPnl.toString()[0] === "-" ? "text-red-500" : "text-green-500"}>{t.dineroPnl.toString()[0] === "-" ? "-" : "+"} ${t.dineroPnl.toString()[0] === "-" ? t.dineroPnl.toString().split("-")[1] : t.dineroPnl}</p>
                                    <p>{cuentas.filter(c => c.idCuenta === t.idCuenta)[0].empresa}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>You dont have trades yet.</p>
                )}
            </div>
        </div>
  )
}
