export default function CuentasCompoSkeleton() {
    return (
        <ol className="cuentas-list my-5 rounded-lg bg-neutral-900 flex flex-col gap-3">
            {[...Array(3)].map((_, index) => (
                <li key={index} className="p-5 animate-pulse">
                    <div className="li-mode bg-neutral-950 bg-opacity-50 backdrop-blur-xl p-5 rounded-xl grid grid-cols-4 gap-3 w-full justify-between mb-3">
                        <p className="my-auto flex gap-3">
                            <span className="bg-orange-500 rounded-lg p-2">Fecha Creación:</span>{" "}
                            <span className="my-auto w-24 h-6 bg-gray-700 rounded-md"></span>
                        </p>
                        <p className="my-auto flex gap-3">
                            <span className="bg-orange-500 rounded-lg p-2">Empresa:</span>{" "}
                            <span className="my-auto w-24 h-6 bg-gray-700 rounded-md"></span>
                        </p>
                        <p className="my-auto flex gap-3">
                            <span className="bg-orange-500 rounded-lg p-2">Tamaño:</span>{" "}
                            <span className="my-auto w-16 h-6 bg-gray-700 rounded-md"></span>
                        </p>
                        <div className="action-buttons flex justify-end gap-3">
                            <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
                            <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
                            <div className="w-16 h-10 bg-gray-700 rounded-lg"></div>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
