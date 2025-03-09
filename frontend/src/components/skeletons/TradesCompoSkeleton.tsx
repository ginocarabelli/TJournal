import "@/app/styles/trades.css";

export default function TradesCompoSkeleton() {
    return (
        <ol className="trades-list p-4 gap-3 font-bold bg-neutral-950 rounded-xl h-auto overflow-y-scroll">
            {[...Array(5)].map((_, index) => (
                <li key={index} className="p-6 bg-neutral-900 rounded-xl w-full text-white">
                    <div className="li-mode flex flex-col gap-3 justify-between">
                        <div className="header-data w-full flex flex-wrap gap-3">
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                        </div>
                        <div className="trade-data flex flex-col flex-wrap gap-3 mt-2">
                            <div className="skeleton bg-slate-700 w-20 h-6 rounded-lg"></div>
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                        </div>
                        <div className="trade-notes">
                            <div className="skeleton bg-slate-700 w-full h-6 rounded-lg"></div>
                        </div>
                        <div className="trade-actions flex gap-3">
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                            <div className="skeleton bg-slate-700 w-32 h-6 rounded-lg"></div>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
