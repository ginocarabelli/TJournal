import { authOptions } from "@/app/lib/utils";
import { deleteTrades, getCuentas, getTradesId } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "@/app/styles/create-trades.css"
import { ICuenta } from "@/app/lib/definitions";

type tParams = Promise<{ id: number }>;

export default async function DeleteTrade({ params } : { params : tParams }) {

    const idTrade = (await params).id;
    const session = await getServerSession(authOptions)
    const trade = await getTradesId(session.user.token, Number(idTrade))
    console.log(session)
    const cuentas = await getCuentas(session.user.token, session.user.id)

    async function handleDelete() {
        "use server";
        await deleteTrades(session.user.token, Number(idTrade))
    }

    return (
        <div className="h-screen">
            <div className="formulary flex flex-col justify-center h-full m-auto">
                <h1 className="font-bold bg-red-500 py-3 px-5 mx-3 rounded-lg">¿Are you sure you want to eliminate this trade?</h1>
                <form action={handleDelete} className="p-3 flex flex-col gap-3">
                    <div className="header-row flex gap-3">
                        <input type="datetime" defaultValue={trade.fechaEntrada.slice(0, -3).replace("T", " - ")} id="fechaEntrada" name="fechaEntrada" placeholder="Entry Date" disabled/>
                        <input type="datetime" defaultValue={trade.fechaSalida.slice(0, -3).replace("T", " - ")} id="fechaSalida" name="fechaSalida" placeholder="Exit Date (Optional)" disabled/>
                        <select name="cuenta" defaultValue={trade.idCuenta} id="cuenta" disabled>
                            {cuentas.map((c : ICuenta) => (<option key={c.idCuenta} value={c.idCuenta}>{c.empresa} - ${c.tamanio}</option>))}
                        </select>
                        <select name="tipoTrade" defaultValue={trade.idTipoTrade} id="tipoTrade" disabled>
                            <option value="1">LONG</option>
                            <option value="2">SHORT</option>
                        </select>
                    </div>
                    <div className="body-row flex flex-col flex-wrap gap-3">
                        <div className="first-row flex flex-wrap gap-3">
                            <input className="max-w-64" defaultValue={trade.divisa} type="text" name="divisa" id="divisa" placeholder="Currency (Ex: EUR/USD)" disabled />
                            <input className="max-w-32" defaultValue={trade.riesgo} placeholder="Risk (in %)" type="number" step="0.01" id="risk" name="risk" disabled/>
                            <input className="max-w-48" defaultValue={trade.dineroPnl} placeholder="PNL (in $)" type="number" step="0.01" id="dineroPnl" name="dineroPnl" disabled/>
                        </div>
                        <div className="second-row flex gap-3 flex-wrap">
                            <div className="second-row flex gap-3">
                                <input className="max-w-48" defaultValue={trade.precioEntrada} placeholder="Entry (in $)" type="number" step="0.01" id="entry" name="entry" disabled/>
                                <input className="max-w-48" defaultValue={trade.precioSalida} placeholder="Exit (in $)" type="number" step="0.01" id="exit" name="exit" disabled/>
                            </div>
                            <div className="third-row flex gap-3">
                                <input className="max-w-48" defaultValue={trade.takeProfit ? trade.takeProfit : "Without TP"} placeholder="Take Profit (optional)" type="number" step="0.01" id="tp" name="tp" disabled/>
                                <input className="max-w-48" defaultValue={trade.stopLoss ? trade.stopLoss : "Without SL"} placeholder="Stop Loss (optional)" type="number" step="0.01" id="sl" name="sl" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="note-row">
                        <textarea name="note" defaultValue={trade.note ? trade.note : "Without Notes"} id="note" className="w-full" placeholder="Notes:" maxLength={1000} disabled></textarea>
                    </div>
                    <div className="buttons flex gap-3">
                        <button type="submit" className="bg-red-500 px-3 py-1 text-lg rounded-lg">Delete</button>
                        <Link className="bg-gray-500 px-3 py-1 text-lg gap-3 rounded-lg" href="/dashboard/trades">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}