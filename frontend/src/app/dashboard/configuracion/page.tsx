import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser, putUser } from "@/app/lib/data";
import { IUser } from "@/app/lib/definitions";
import EditUser from "@/components/EditUser";
import { Loader } from "@/components/ui/loader";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Configuracion({ searchParams }: { searchParams: { status?: string; message?: string } }) {
  
  const param = await searchParams;
  const session = await getServerSession(authOptions);
  const user = await getUser(session.user.token, session.user.user.idUsuario);

  async function handleEdit(formData: FormData) {
    "use server";
    if (formData.get("password") !== formData.get("repeatPassword")) {
      redirect("/dashboard/configuracion?status=error&message=Las%20contraseñas%20no%20coinciden");
    }

    const usuario: IUser = {
      idUsuario: user.idUsuario,
      nombre: formData.get("name") || user.nombre,
      apellido: formData.get("lastname") || user.apellido,
      email: formData.get("email") || user.email,
      usuario1: formData.get("username") || user.usuario1,
      contrasena: formData.get("password") || user.contrasena,
    };

    const response = await putUser(session.user.token, usuario);

    if (response.status === 400) {
      redirect(`/dashboard/configuracion?status=error&message=${encodeURIComponent(response.message)}`);
    }
    redirect("/logout")
  }

  return (
    <div className="w-full h-screen py-12 font-semibold">
      <main className="m-auto px-5 w-full h-full flex flex-col gap-3 text-white font-semibold m-auto">
        <h1>Configuración</h1>
        <EditUser user={user} handleEdit={handleEdit}/>
        <div className="result w-full flex justify-start">
        {param.message && (
          <div
            className={`p-3 rounded-lg w-auto ${
              param.status === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {decodeURIComponent(param.message)}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
