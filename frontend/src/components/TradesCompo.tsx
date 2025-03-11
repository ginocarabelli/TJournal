import Link from "next/link";
import "@/app/styles/trades.css"
import { ICuenta } from "@/app/lib/definitions";

export default async function TradesCompo({ session, cuentas, trades }) {

    function convertAccount(idCuenta : number) {
        const selectedAccount = cuentas.length > 1 ? cuentas.filter(c => c.idCuenta === idCuenta)[0] : cuentas;
        const cuentaModel : ICuenta = {
            idUsuario: session.user.id,
            idCuenta: idCuenta,
            empresa: selectedAccount.empresa,
            tamanio: selectedAccount.tamanio,
            fechaCreacion: selectedAccount.fechaCreacion
        }
        return (
            <p className="bg-sky-500 px-3 py-2 rounded-lg"><span>{cuentaModel.empresa}</span> - <span>$ {cuentaModel.tamanio}</span></p>
        );
    }

    return (
        <ol className="trades-list p-4 gap-3 font-bold bg-neutral-950 rounded-xl h-auto overflow-y-scroll">
            {trades
                .sort((a, b) => new Date(b.fechaEntrada).getTime() - new Date(a.fechaEntrada).getTime())
                .map((trades) => (
                    <li key={trades.idTrade} className="p-6 bg-neutral-900 rounded-xl w-full text-white">
                        <div className="li-mode flex flex-col gap-3 justify-between">
                            <div className="header-data w-full flex flex-wrap gap-3">
                                <p className="bg-orange-500 px-3 py-2 rounded-lg">
                                    {trades.fechaEntrada.toString().split('T')[0]} - {trades.fechaEntrada.toString().slice(0, -3).split('T')[1]} hs
                                </p>
                                {convertAccount(trades.idCuenta)}
                            </div>
                            <div className="trade-data flex flex-col flex-wrap gap-3 mt-2">
                                <p className="flex gap-1"><span className="my-auto">{trades.divisa}</span> <span className={`${trades.idTipoTrade === 1 ? "bg-green-500" : "bg-red-500"} mx-2 px-2 py-1 rounded-lg text-xs`}>{trades.idTipoTrade && Number(trades.idTipoTrade) === 1 ? "LONG" : "SHORT"}</span></p>
                                <h1 
                                className={`${trades.dineroPnl.toString()[0] === "-" ? "text-red-500" : "text-green-500"} text-5xl p-1`}
                                >
                                    {trades.dineroPnl.toString()[0] === "-" ? "-" : "+"} ${trades.dineroPnl.toString()[0] === "-" ? trades.dineroPnl.toString().split("-")[1] : trades.dineroPnl} 
                                    <span 
                                    className={`${trades.dineroPnl.toString()[0] === "-" ? "text-red-500" : "text-green-500"} text-lg px-3`}
                                    >
                                        {trades.porcentajePnl}%
                                    </span>
                                </h1>
                                <p className="bg-neutral-950 py-2 px-3 rounded-lg">
                                    Margin: 
                                    <span className="text-yellow-500 px-2">$ {trades.margin}</span>
                                    Risk: 
                                    <span className={`px-2 ${trades.riesgo <= 25 ? "text-green-500" : trades.riesgo > 25 && trades.riesgo <= 50 ? "text-yellow-500" : "text-red-500"}`}>{trades.riesgo}%</span>
                                </p>
                                <p className="bg-neutral-950 py-2 px-3 rounded-lg">
                                    Entry: 
                                    <span className="text-green-500 px-2">{trades.precioEntrada}</span>
                                    Exit: 
                                    <span className="text-red-500 px-2">{trades.precioSalida ? trades.precioSalida : "Not closed yet"}</span>
                                </p>
                                <p className="bg-neutral-950 py-2 px-3 rounded-lg">
                                    Take Profit: 
                                    <span className="text-green-500 px-2">{trades.takeProfit ? trades.takeProfit : "Without TP"}</span>
                                    Stop Loss: 
                                    <span className="text-red-500 px-2">{trades.stopLoss ? trades.stopLoss : "Without SL"}</span>
                                </p>
                            </div>
                            <div className="trade-notes">
                                {trades.nota ? (
                                    <p className="flex flex-col">Notes: <span className={trades.nota ? "bg-neutral-900 px-3 py-2 rounded-lg" : ""}>{trades.nota ? trades.nota : ""}</span></p>
                                ) : ""}
                            </div>
                            <div className="trade-actions flex gap-3">
                                <Link className="bg-yellow-500 px-3 py-2 rounded-lg"  href={`/dashboard/trades/update/${trades.idTrade}`}>Edit</Link>
                                <Link className="bg-red-500 px-3 py-2 rounded-lg"  href={`/dashboard/trades/delete/${trades.idTrade}`}>Delete</Link>
                            </div>
                        </div>
                    </li>
            ))}
        </ol>
    );
}