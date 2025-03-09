import { ICuenta } from "@/app/lib/definitions";
import Link from "next/link";
export default function CuentasCompo({ cuentas } : { cuentas : ICuenta[], }) {

    return (
        <ol className="cuentas-list my-5 rounded-lg bg-neutral-900 flex flex-col gap-3">
            {cuentas
                .sort((a, b) => b.tamanio - a.tamanio)
                .map((cuenta) => (
                    <li key={cuenta.idCuenta} className="p-5">
                        <div className="li-mode bg-neutral-950 bg-opacity-50 backdrop-blur-xl p-5 rounded-xl grid grid-cols-4 gap-3 w-100 justify-between mb-3">
                            <p className="my-auto flex gap-3">
                                <span className="bg-orange-500 rounded-lg p-2">Creation Date:</span>{" "}
                                <span className="my-auto">{cuenta.fechaCreacion?.toString()}</span>
                            </p>
                            <p className="my-auto flex gap-3 my-auto">
                                <span className="bg-orange-500 rounded-lg p-2">Company:</span>{" "}
                                <span className="my-auto">{cuenta.empresa ? cuenta.empresa : "Sin empresa"}</span>
                            </p>
                            <p className="my-auto flex gap-3">
                                <span className="bg-orange-500 rounded-lg p-2">Size:</span>{" "}
                                <span className="my-auto">$ {cuenta.tamanio.toFixed(2)}</span>
                            </p>
                            <div className="action-buttons flex justify-end gap-3">
                                <Link href={`/dashboard/cuentas/${cuenta.idCuenta}`} className="bg-blue-500 p-3 rounded-lg link-view">
                                    View
                                </Link>
                                <Link
                                    className="bg-yellow-500 p-3 rounded-lg"
                                    href={`/dashboard/cuentas/update/${cuenta.idCuenta}`}
                                >
                                    Edit
                                </Link>
                                <Link
                                    className="bg-red-500 p-3 rounded-lg"
                                    href={`/dashboard/cuentas/delete/${cuenta.idCuenta}`}
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
        </ol>
    );
}