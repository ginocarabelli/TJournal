import React from "react";

export default function LastTradesSkeleton() {
  return (
    <div className="ultimos-trades bg-neutral-950 rounded-xl w-full mx-auto p-5" id="ultimosTrades">
      <h3 className="animate-pulse bg-neutral-800 h-6 w-32 rounded"></h3>
      <div className="trades-container p-5 rounded-lg h-4/5 overflow-y-scroll">
        <div className="last-trades flex flex-col">
          <div className="header grid grid-cols-7 mb-3 px-3">
            {Array(7).fill().map((_, i) => (
              <div key={i} className="animate-pulse bg-neutral-800 h-4 w-20 rounded"></div>
            ))}
          </div>
          <div className='rows'>
            {Array(5).fill().map((_, i) => (
              <div key={i} className='bg-neutral-900 grid grid-cols-7 p-3 mt-2 rounded-lg animate-pulse'>
                {Array(7).fill().map((_, j) => (
                  <div key={j} className="bg-neutral-700 h-4 w-full rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
