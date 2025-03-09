import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteTrades, getCuentas, getCuentasId, getTradesId, putTrades } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "@/app/styles/create-trades.css"
import { ITrades } from "@/app/lib/definitions";

export default async function UpdateTrade({ params } : { params : { id: string }}) {

    const awaitedParams = await params;
    const idTrade = awaitedParams.id;
    const session = await getServerSession(authOptions)
    const trade = await getTradesId(session.user.token, Number(idTrade))
    const cuentas = await getCuentas(session.user.token, session.user.user.idUsuario)

    async function handleEdit(formData : FormData) {
        "use server";
        const idCuenta = Number(formData.get("cuenta"));
        const selectedAccount = await getCuentasId(session.user.token, idCuenta);
    
        if (!selectedAccount) {
            throw new Error("Cuenta no encontrada");
        }
    
        const risk = Number(formData.get("risk"));
        const margin = (selectedAccount.tamanio * risk) / 100;
        const pnl = Number(formData.get("dineroPnl"));
    
        function calculatePercentage(margin: number, pnl: number) {
            return (pnl * 100) / margin;
        }
    
        const percentage = calculatePercentage(margin, pnl);
    
        const trade: ITrades = {
            idTrade: Number(idTrade),
            idCuenta: idCuenta,
            idTipoTrade: Number(formData.get("tipoTrade")),
            fechaEntrada: new Date(formData.get("fechaEntrada") as string),
            fechaSalida: new Date(formData.get("fechaSalida") as string),
            divisa: formData.get("divisa") as string,
            riesgo: risk,
            margin: margin,
            precioEntrada: Number(formData.get("entry")),
            precioSalida: Number(formData.get("exit")),
            takeProfit: Number(formData.get("tp")),
            stopLoss: Number(formData.get("sl")),
            tradePips: Number(formData.get("pips")),
            porcentajePnl: percentage,
            dineroPnl: pnl,
            nota: formData.get("note") as string | undefined,
        };
        await putTrades(session.user.token, trade);
    }

    function formatDateForInput(dateString: string): string {
        const date = new Date(dateString);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
    }
      
    return (
        <div className="h-screen">
            <div className="formulary flex flex-col justify-center h-full m-auto">
                <h1 className="font-bold bg-yellow-500 py-3 px-5 mx-3 rounded-lg">Edit Trade</h1>
                <form action={handleEdit} className="p-3 flex flex-col gap-3">
                    <div className="header-row flex gap-3">
                        <input type="datetime-local" defaultValue={formatDateForInput(trade.fechaEntrada)} id="fechaEntrada" name="fechaEntrada" placeholder="Entry Date" required/>
                        <input type="datetime-local" defaultValue={formatDateForInput(trade.fechaSalida)} id="fechaSalida" name="fechaSalida" placeholder="Exit Date (Optional)" required/>
                        <select name="cuenta" defaultValue={trade.idCuenta} id="cuenta" required>
                            {cuentas.map(c => (<option key={c.idCuenta} value={c.idCuenta}>{c.empresa} - ${c.tamanio}</option>))}
                        </select>
                        <select name="tipoTrade" defaultValue={trade.idTipoTrade} id="tipoTrade" required>
                            <option value="1">LONG</option>
                            <option value="2">SHORT</option>
                        </select>
                    </div>
                    <div className="body-row flex flex-col flex-wrap gap-3">
                        <div className="first-row flex flex-wrap gap-3">
                            <input className="max-w-64" defaultValue={trade.divisa} type="text" name="divisa" id="divisa" placeholder="Currency (Ex: EUR/USD)" required />
                            <input className="max-w-32" defaultValue={trade.riesgo} placeholder="Risk (in %)" type="number" step="0.01" id="risk" name="risk" required/>
                            <input className="max-w-48" defaultValue={trade.dineroPnl} placeholder="PNL (in $)" type="number" step="0.01" id="dineroPnl" name="dineroPnl" required/>
                        </div>
                        <div className="second-row flex gap-3 flex-wrap">
                            <div className="second-row flex gap-3">
                                <input className="max-w-48" defaultValue={trade.precioEntrada} placeholder="Entry (in $)" type="number" step="0.01" id="entry" name="entry" required/>
                                <input className="max-w-48" defaultValue={trade.precioSalida} placeholder="Exit (in $)" type="number" step="0.01" id="exit" name="exit" required/>
                            </div>
                            <div className="third-row flex gap-3">
                                <input className="max-w-48" defaultValue={trade.takeProfit} placeholder="Take Profit (optional)" type="number" step="0.01" id="tp" name="tp"/>
                                <input className="max-w-48" defaultValue={trade.stopLoss} placeholder="Stop Loss (optional)" type="number" step="0.01" id="sl" name="sl"/>
                            </div>
                        </div>
                    </div>
                    <div className="note-row">
                        <textarea name="note" defaultValue={trade.nota ? trade.nota : ""} id="note" className="w-full" placeholder="Notes:" maxLength="1000"></textarea>
                    </div>
                    <div className="buttons flex gap-3">
                        <button type="submit" className="bg-yellow-500 px-3 py-1 text-lg rounded-lg">Edit</button>
                        <Link className="bg-gray-500 px-3 py-1 text-lg gap-3 rounded-lg" href="/dashboard/trades">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}