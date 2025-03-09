import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteCuentas, getCuentasId } from "@/app/lib/data";
import Dialog from "@/components/Dialog";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DeleteAccount({ params } : { params : { id: string }}) {

    const awaitedParams = await params;
    const idCuenta = awaitedParams?.id;
    const session = await getServerSession(authOptions)
    const cuenta = await getCuentasId(session.user.token, Number(idCuenta))

    async function handleDelete() {
        "use server";

        await deleteCuentas(session.user.token, Number(idCuenta))
    }

    async function onClose() {
        "use server"
        console.log("Modal closed")
    };

    return ( 
        <div>

            <Dialog title="Delete Account" onClose={onClose} onOk={handleDelete}>
                <p>
                    Are you sure you want to delete this account? This action is irreversible and all the trades
                    linked to this account will be deleted too.
                </p>
            </Dialog>

            <form action={handleDelete} className="flex flex-wrap justify-between gap-3 p-4 bg-blue-500">
                <div className="inputs flex gap-3">
                    <div className="row my-auto flex gap-3">
                        <label htmlFor="empresa">Empresa:</label>
                        <input type="text" name="empresa" id="empresa" className="text-black"  defaultValue={cuenta.empresa} disabled/>
                    </div>
                    <div className="row my-auto flex gap-3">
                        <label htmlFor="tamanio">Tamaño:</label>
                        <input type="number" step="0.01" name="tamanio" className="text-black" id="tamanio" defaultValue={cuenta.tamanio} disabled/>
                    </div>
                </div>
                <div className="action-buttons flex gap-3">
                    <Link href={`/dashboard/cuentas/delete/${idCuenta}?showDialog=y`} className="bg-green-500 px-3 py-2">
                        Confirmar
                    </Link>
                </div>
            </form>
            
            <Link className="bg-red-500 px-3 py-2" href="/dashboard/cuentas">
                Cancelar
            </Link>
        </div>
    )
}