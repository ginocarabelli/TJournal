import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ICuenta, IPnl, ITrades, IUser } from "./definitions";

export async function getUser(token : string, user : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Usuario/id/${user}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            },
            next: { revalidate: 3600 }
        },
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getCuentas(token : string, user : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Cuenta/user/${user}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getCuentasId(token : string, cuenta : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Cuenta/id/${cuenta}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data[0];
}
export async function getTrades(token : string, user : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade/user/${user}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getTradesId(token : string, trade : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade/id/${trade}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getTradesCuenta(token : string, trade : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade/cuenta/${trade}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getStatsPercentage(token : string, account : number, period : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Estadistica/porcentaje/${account}-${period}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        console.error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getStatsAverage(token : string, account : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Estadistica/promedio/${account}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        console.error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function getStatsPnlPeriod(token : string, account : number, period : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Estadistica/pnlPeriod/${account}-${period}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        return res.statusText;
    }
    const data = await res.json();
    return data.map((item : IPnl) => ({
        ...item,
        pnl: item.pnl.toFixed(2),
        fecha: new Date(item.fecha).toLocaleDateString("en-EN", { day: "2-digit", month: "short" }),
    }));
}
export async function getStatsEmotion(token : string, account : number, period : number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Estadistica/emotion/${account}-${period}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        console.error(`Error: ${res.statusText}`)
    }
    const data = await res.json();
    return data;
}
export async function postCuentas(token : string, cuenta : ICuenta) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Cuenta`,
        {
            method: "POST",
            body: JSON.stringify(cuenta),
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    await res;
    revalidatePath('/dashboard/cuentas');
    redirect('/dashboard/cuentas');
}
export async function postTrades(token : string, trade : ITrades) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade`,
        {
            method: "POST",
            body: JSON.stringify(trade),
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        console.error("error: ", res.statusText)
    }
    console.log(res)
    await res;
    revalidatePath('/dashboard/trades');
    redirect('/dashboard/trades');
}
export async function putCuentas(token : string, cuenta : ICuenta) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Cuenta/${cuenta.idCuenta}`,
        {
            method: "PUT",
            body: JSON.stringify(cuenta),
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res.statusText}`)
    }
    await res;
    revalidatePath('/dashboard/cuentas');
    redirect('/dashboard/cuentas');
}
export async function putTrades(token : string, trade : ITrades) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade/${trade.idTrade}`,
        {
            method: "PUT",
            body: JSON.stringify(trade),
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        console.error('Error: ', res.statusText)
    }
    revalidatePath('/dashboard/trades');
    redirect('/dashboard/trades');
}
export async function putUser(token : string, user : IUser) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Usuario/${user.idUsuario}`,
        {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        const errorData = await res.text();
        console.error("Error:", errorData);
        return { status: res.status, message: errorData };
    }
    const data = await res.text();
    revalidatePath('/dashboard');
    return { status: res.status, message: data };
}
export async function deleteCuentas(token : string, cuenta : number) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Cuenta/${cuenta}`,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res}`)
    }
    revalidatePath('/dashboard/cuentas');
    redirect('/dashboard/cuentas');
}
export async function deleteTrades(token : string, trade : number) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/Trade/${trade}`,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        }
    );
    if(!res.ok){
        throw new Error(`Error: ${res}`)
    }
    redirect('/dashboard/trades');
}