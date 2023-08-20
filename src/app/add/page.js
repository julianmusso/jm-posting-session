import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import AddButton from '@/components/addButton';
import { tareas } from '../page';

export default function AddPage() {

    async function addTarea(data) {
        "use server"

        await new Promise((resolve) => setTimeout(resolve, 1000))
        const tarea = data.get("tarea");
        tareas.push(tarea);
        revalidatePath("/");
        redirect("/")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className='text-4xl font-bold'>Añadir Tarea</h1>
    
            <form action={addTarea} key={Math.random()}>
                <input type="text" name="tarea" className='border border-gray-300 text-slate-800 rounded-lg py-4 px-4' />
                <AddButton />
            </form>

        </main>
    )
}
