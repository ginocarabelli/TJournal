import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../components/ui/fonts";
import { Providers } from "./context/Providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trading Journal",
  description: "Register your trades in the Journal",
};

export default function RootLayout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f97316_100%)] h-auto antialiased text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
