import React from "react";
import Card from "../Card";

export default function TradesStatsSkeleton() {
  return (
    <div className="bg-neutral-950 cards-container flex flex-wrap justify-between w-full mx-auto gap-2 p-5 rounded-xl text-white" id="cards">
      {["Percentage W&L", "Monthly PnL", "You should feel:", "Total Trades", "Average PnL (per trade)"].map((title, index) => (
        <Card key={index} title={title}>
          <div className="flex justify-center text-center align-middle my-auto h-10 w-24 bg-neutral-700 rounded animate-pulse"></div>
        </Card>
      ))}
    </div>
  );
}
