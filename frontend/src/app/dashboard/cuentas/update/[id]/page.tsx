import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCuentasId, putCuentas } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ICuentas {
    idUsuario: number;
    idCuenta: number;
    empresa?: string;
    tamanio: string;
    fechaCreacion?: Date;
}

export default async function EditAccount({ params } : { params : { id: string }}) {

    const idCuenta = params.id;
    const session = await getServerSession(authOptions)
    const cuenta = await getCuentasId(session.user.token, idCuenta)
    console.log(cuenta)

    async function handleEdit(formData : FormData) {
        "use server";
        const updatedCuenta : ICuentas = {
            idUsuario: session.user.user.idUsuario,
            idCuenta: Number(idCuenta) as number,
            empresa: formData.get('empresa') as string | undefined,
            tamanio: formData.get('tamanio') as string,
        } 
        await putCuentas(session.user.token, updatedCuenta)
    }

    return ( 
        <div>
            <form action={handleEdit} className="flex flex-wrap justify-between gap-3 p-4 bg-blue-500">
                <div className="inputs flex gap-3">
                    <div className="row my-auto flex gap-3">
                        <label htmlFor="empresa">Empresa:</label>
                        <input
                            type="text"
                            name="empresa"
                            id="empresa"
                            className="text-black"
                            defaultValue={cuenta.empresa}
                        />
                    </div>
                    <div className="row my-auto flex gap-3">
                        <label htmlFor="tamanio">Tamaño:</label>
                        <input
                            type="number"
                            step="0.01"
                            name="tamanio"
                            className="text-black"
                            id="tamanio"
                            defaultValue={cuenta.tamanio}
                            required
                        />
                    </div>
                </div>
                <div className="action-buttons flex gap-3">
                    <button
                        className="bg-green-500 px-3 py-2"
                        type="submit"
                    >
                        Confirmar
                    </button>
                </div>
            </form>
            
            <Link
            className="bg-red-500 px-3 py-2"
            href="/dashboard/cuentas"
            >
                Cancelar
            </Link>
        </div>
    )
}