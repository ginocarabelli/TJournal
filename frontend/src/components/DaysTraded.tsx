import { ITrades } from '@/app/lib/definitions';
import React from 'react'

export default function DaysTraded({ trades } : { trades : ITrades[] }) {
    
    function pnlDay(day : number) {
        let pnl = 0;
        
        const tradesMatch = trades
            .filter(t => new Date(t.fechaEntrada).getDate() === day);
        if(tradesMatch.length !== 0) {
            tradesMatch.forEach(trade => {
                pnl += trade.dineroPnl
            });
            return (pnl.toFixed(2));
        } else {
            return pnl;
        }
    }

    const dias = () => {
        const fecha = new Date();
        const mes = fecha.getMonth();
        const anio = fecha.getFullYear();
        const diasEnElMes = new Date(anio, mes+1, 0).getDate();

        const daysArray = Array.from({ length: diasEnElMes }, (_, index) => index + 1);
        return daysArray;
    };

    const diaUno = () => {
        const fecha = new Date();
        const date = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        const day = Number(date.getDay());  // Retorna el día de la semana (0 = domingo, 6 = sábado)
        let dia = `col-start-1`;
        if(day === 2){
            dia = `col-start-2`
        } else if (day === 3){
            dia = `col-start-3`
        } else if (day === 4){
            dia = `col-start-4`
        } else if (day === 5){
            dia = `col-start-5`
        } else if (day === 6){
            dia = `col-start-6`
        } else{
            dia = `col-start-7`
        }
        return dia;
    };

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthDays = dias();

    return (
        <div className="trades-del-mes text-white p-7 rounded-xl bg-neutral-950 w-full h-auto" id="tradesMes">
            <h3>
                Month trades
            </h3>
            <div className="dias-container py-5 rounded-lg">
                <ol className="dias grid grid-cols-7 gap-2 text-center">
                    {weekDays.map(weekDay => (
                        <li key={weekDay} className="day-name mb-2">
                            {weekDay}
                        </li>
                    ))}
                    {monthDays.map((dia) => (
                        <li key={dia} className={`${dia === 1 ? `${diaUno()}` : ""} bg-neutral-800 min-w-323 min-h-16 rounded-lg relative flex justify-center`}>
                            <p className='absolute top-2 left-2 text-xs text-white font-semibold'>{dia}</p>
                            <h1 className={`text-md my-auto font-semibold ${pnlDay(dia).toString()[0] !== "-" ? "text-green-500" : "text-red-500"}`}>
                                {pnlDay(dia) !== 0 ? (pnlDay(dia).toString()[0] === '-' ? ("-$" + pnlDay(dia).toString().slice(1)) : ("+$" + pnlDay(dia))) : ""}
                            </h1>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
