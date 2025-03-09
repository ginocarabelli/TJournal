import { getStatsAverage, getStatsEmotion, getStatsPercentage, getStatsPnlPeriod, getTrades } from "@/app/lib/data";
import Card from "./Card";

interface ITrades {
    idTrade: number,
    idCuenta: number,
    idTipoTrade?: string,
    fechaEntrada: Date,
    fechaSalida?: Date,
    divisa: string,
    riesgo: number,
    margin: number,
    precioEntrada: number,
    precioSalida: number,
    takeProfit?: number,
    stopLoss?: number,
    tradePips: number,
    porcentajePnl: number,
    dineroPnl: number,
    nota?: string
}

interface IPnl {
    pnl: number,
    fecha: string
}

export default async function TradesStats({ session, trades, accountId, period }) {

    const percentage = await getStatsPercentage(session.user.token, accountId, period)
    const average = await getStatsAverage(session.user.token, accountId)
    const pnlPeriod = await getStatsPnlPeriod(session.user.token, accountId, period)
    const emotion = await getStatsEmotion(session.user.token, accountId, period)

    function emotionColor(string) {
        let className = "";
    
        if (string === 'NEUTRAL') {
            className = 'text-gray-500';
        } else if (string === 'VERY BAD') {
            className = 'text-red-500';
        } else if (string === 'BAD') {
            className = 'text-rose-500';
        } else if (string === 'GOOD') {
            className = 'text-yellow-500';
        } else {
            className = 'text-green-500';
        }
    
        return className;
    }

    function totalTrades(trades: ITrades[]): number {
        return trades.length;
    }    

    function monthlyPnL(pnl : IPnl[]) {
        let moneyPnl = 0;
        pnl.forEach((item) => {
            moneyPnl += Number(item.pnl);
        })
        return moneyPnl.toFixed(1);
    }

    return (
        <div className="bg-neutral-950 cards-container flex flex-wrap justify-between w-full mx-auto gap-2 p-5 rounded-xl text-white" id="cards">
            
            <Card title="Percentage W&L">
                <p className={`flex justify-center text-center align-middle my-auto text-4xl font-bold ${percentage.porcentaje.toString()[0] === '-' ? 'text-red-500' : percentage.porcentaje === 0 ? "text-white" : 'text-green-500'}`}>
                    {percentage.porcentaje.toFixed(1)}%
                </p>
            </Card>
            <Card title="Monthly PnL">
                <p className={`flex justify-center text-center align-middle my-auto text-3xl font-bold ${monthlyPnL(pnlPeriod).toString()[0] === '-' ? 'text-red-500' : 'text-green-500'}`}>
                $ {monthlyPnL(pnlPeriod)}
                </p>
            </Card>
            <Card title="You should feel:">
                <p className={`flex justify-center text-center align-middle my-auto text-4xl font-bold ${emotionColor(emotion.emotion)}`}>
                    {emotion.emotion}
                </p>
            </Card>
            <Card title="Total Trades">
                <p className={`flex justify-center text-center align-middle my-auto text-4xl font-bold`}>
                    {totalTrades(trades)}
                </p>
            </Card>
            <Card title="Average PnL (per trade)">
                <p className={`flex justify-center text-center align-middle my-auto text-3xl font-bold ${average.pnlAvg.toString()[0] === '-' ? 'text-red-500' : average.pnlAvg === 0 ? "text-white" : 'text-green-500'}`}>
                    $ {average.pnlAvg}
                </p>
            </Card>
        </div>
    );
}
