import React from "react";

export default function DaysTradedSkeleton() {
  return (
    <div className="trades-del-mes text-white p-7 rounded-xl bg-neutral-950 w-full h-auto" id="tradesMes">
      <h3 className="animate-pulse bg-neutral-800 h-6 w-40 rounded"></h3>
      <div className="dias-container py-5 rounded-lg">
        <ol className="dias grid grid-cols-7 gap-2 text-center">
          {/* Semana */}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((weekDay) => (
            <li key={weekDay} className="day-name mb-2 text-neutral-600">
              {weekDay}
            </li>
          ))}
          {/* Días del mes (placeholder) */}
          {Array(30).fill().map((_, i) => (
            <li
              key={i}
              className="bg-neutral-800 min-w-323 min-h-16 rounded-lg relative flex justify-center animate-pulse"
            >
              <div className="absolute top-2 left-2 bg-neutral-700 h-4 w-6 rounded"></div>
              <div className="w-12 h-5 bg-neutral-700 rounded"></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
