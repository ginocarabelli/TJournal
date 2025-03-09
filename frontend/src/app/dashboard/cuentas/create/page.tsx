import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { postCuentas } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface ICuentas {
    idUsuario: number;
    empresa?: string;
    tamanio: string;
}

export default async function CrearCuenta() {

    const session = await getServerSession(authOptions)

    async function handleCreate(formData : FormData) {
        "use server";
        const updatedCuenta : ICuentas = {
            idUsuario: session.user.user.idUsuario,
            empresa: formData.get('empresa') as string | undefined,
            tamanio: formData.get('tamanio') as string,
        } 
        await postCuentas(session.user.token, updatedCuenta)
    }

    return (
        <div className="m-auto flex flex-col gap-3 font-semibold h-screen">
            <h1 className="bg-green-500 p-3 rounded-lg">Create Account</h1>
            <form action={handleCreate} className="p-3 flex flex-col gap-3 h-full justify-center">
                <div className="content flex flex-col gap-3">
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="empresa">Company</label>
                        <input className="text-black px-4 py-2 rounded-lg" type="text" id="empresa" name="empresa" placeholder="Optional"/>
                    </div>
                    <div className="row flex flex-col gap-2 mb-2">
                        <label htmlFor="tamanio">Size</label>
                        <div className="input flex">
                            <h1 className="my-auto bg-green-500 px-3 py-2 rounded-l-lg">$</h1>
                            <input className="text-black px-4 py-2 rounded-r-lg" type="number" step="0.01" id="tamanio" name="tamanio" placeholder="Ex: 50000" required/>
                        </div>
                    </div>
                </div>
                <div className="buttons flex gap-3">
                    <button type="submit" className="bg-green-500 p-3 rounded-lg">Create</button>
                    <Link className="bg-red-500 p-3 rounded-lg gap-3" href="/dashboard/cuentas">Back</Link>
                </div>
            </form>
        </div>
    )
}