import Navbar from "@/components/Nav";
import "@/app/styles/home.css"
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col gap-15">
      <Navbar />
      <main className="w-full mx-auto lg:w-2/3 py-20 my-10 flex gap-4 flex-wrap justify-between">
        <div className="text my-auto w-3/3 flex flex-col gap-10 justify-start">
          <h1 className="text-7xl xl:text-9xl font-bold mx-auto text-center"><span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">Evolve your way of </span><span className="font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Trading</span></h1>
          <Link href={"/register"} className="text-xl self-center transition duration-300 hover:scale-125 bg-orange-500 px-3 py-2 rounded-lg">Get Started</Link>
        </div>
        <div className="illustration">
          
        </div>
      </main>
      <div>
      <section className="first-section py-20 flex flex-col gap-5">
        <div className="w-2/3 h-full mx-auto relative">
          <div className="title flex flex justify-between">
            <h1 className="text-5xl font-semibold w-2/5 my-auto">What is <br /><strong>Trading Journal</strong>?</h1>
            <p className="w-2/4 my-auto text-xl">
            <strong>Trading Journal</strong> is an application that allows you to 
            register your accounts and trades in a database for 
            free and obtain detailed trading statistics. 
            You can create, edit and delete accounts and trades. 
            The project is in beta phase and will gradually advance and 
            improve the user experience.
            </p>
          </div>
        </div>
      </section>
      <section className="second-section w-2/3 my-20 mx-auto rounded-2xl p-20 bg-neutral-900 bg-opacity-5 backdrop-blur-xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className="title flex flex-col mx-auto gap-3">
          <h1 className="text-5xl font-semibold mx-auto"><span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">How it </span><span className="font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Works</span>?</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mx-auto">
          <div className="first-step w-1/4 flex flex-col gap-3 m-auto rounded-xl">
            <Image src="/chart.png" width={250} height={250} alt="Trading" className="m-auto"/>
            <h1 className="text-2xl font-bold text-center self-center">Make your trade</h1>
          </div>
          <MoveRight className="rotate-90 lg:rotate-0 m-auto size-24"/>
          <div className="second-step w-1/4 flex flex-col gap-3 m-auto">
            <Image src="/formulary.png" width={250} height={250} alt="Trading" className="m-auto p-5"/>
            <h1 className="text-2xl font-bold text-center self-center">Register it in the app</h1>
          </div>
          <MoveRight className="rotate-90 lg:rotate-0 m-auto size-24" />
          <div className="third-step w-1/4 flex flex-col gap-3 m-auto">
            <Image src="/analytics.png" width={250} height={250} alt="Trading" className="m-auto p-5"/>
            <h1 className="text-2xl font-bold text-center self-center">Get your account Analytics</h1>
          </div>
        </div>
      </section>
      </div>
      
      <Footer/>
    </div>
  );
}
