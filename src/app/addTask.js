"use server"

import { revalidatePath } from "next/cache"
import taskSchema from "./taskSchema"
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function addTarea(data) {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Se genera un timeout para dejar el botón cargando.
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Construyo la variable desde FormData para añadir a la DB.
    // Combino la tarea del formData y el email de la sesión para darle autoría.
    // Los atributos del objeto de la variable deben coincidir con el Schema que intento crear.

    const tarea = {
        task: data.get("tarea"),
        owner: user?.email,
        isprivate: data.get("isprivate") ? true : false
    }

    // Envío la tarea a la DB para crearla con la variable anterior
    try {
        await taskSchema.create(tarea)
        revalidatePath("/");
    }
    catch (error) {
        console.log("ERROR CREATING TASK: ", error)
    }

    // Revalido la página para que vuelva a renderizarse con las tareas correspondientes.
}