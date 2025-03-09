import Navbar from "@/components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full relative h-full xl:max-w-7xl m-auto flex justify-center text-white">
      <Navbar />
      {children}
    </div>
  );
}
