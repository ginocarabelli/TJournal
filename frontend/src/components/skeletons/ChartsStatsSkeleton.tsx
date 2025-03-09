import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChartStatsSkeleton() {
  return (
    <div className="flex gap-3 w-full h-full" id="statsCuenta">
      <Card className="w-full bg-neutral-950 backdrop-blur-xl border-none">
        <CardHeader>
          <CardTitle className="text-white">Monthly PnL</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-60 bg-neutral-800 rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    </div>
  );
}