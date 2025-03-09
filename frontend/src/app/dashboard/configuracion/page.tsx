import { getUser, putUser } from "@/app/lib/data";
import { IUser } from "@/app/lib/definitions";
import { authOptions } from "@/app/lib/utils";
import EditUser from "@/components/EditUser";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { setErrorMessage } from "@/app/lib/utils"; // Función para establecer el mensaje de error

export default async function Configuracion() {
  
  const session = await getServerSession(authOptions);
  const user = await getUser(session.user.token, session.user.user.idUsuario);

  async function handleEdit(formData: FormData) {
    "use server";
    
    // Validación de contraseñas
    if (formData.get("password") !== formData.get("repeatPassword")) {
      // Establecer el error en la sesión y redirigir
      await setErrorMessage("Las contraseñas no coinciden");
      return redirect("/dashboard/configuracion");
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
      await setErrorMessage(response.message); // Establecer mensaje de error en la sesión
      return redirect("/dashboard/configuracion");
    }
    
    // Redirigir a logout si todo fue correcto
    return redirect("/logout");
  }

  return (
    <div className="w-full h-screen py-12 font-semibold">
      <main className="m-auto px-5 w-full h-full flex flex-col gap-3 text-white font-semibold m-auto">
        <h1>Configuration</h1>
        <EditUser user={user} handleEdit={handleEdit} />
      </main>
    </div>
  );
}
