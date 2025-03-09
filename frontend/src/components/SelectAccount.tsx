"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectCuenta({ cuentas }) {
    const router = useRouter();
    const [selected, setSelected] = useState(0);

    const handleChange = (e) => {
        const idCuenta = e.target.value;
        setSelected(idCuenta);
        if (idCuenta !== "0") {
            router.push(`/dashboard/cuentas/${idCuenta}`);
        }
    };

    return (
        <div className="select-cuentas flex gap-3">
            <h1 className="my-auto">Account:</h1>
            <select
                name="cuentas"
                id="cuentas"
                className="rounded-lg text-black p-3"
                value={selected}
                onChange={handleChange}
            >
                <option value="0">All Accounts</option>
                {cuentas.map((cuenta) => (
                    <option key={cuenta.idCuenta} value={cuenta.idCuenta}>
                        {cuenta.empresa ? cuenta.empresa : "Sin empresa"} - ${cuenta.tamanio}
                    </option>
                ))}
            </select>
        </div>
    );
}
