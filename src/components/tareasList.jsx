import { deleteTask } from "@/app/deleteTask"
import DeleteButton from "./deleteButton"
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TareasList({ tareas }) {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (tareas[0])
        return (
            <ul className="w-[40%]">
                {tareas.map((tarea) => (

                    <li key={tarea._id} owner={tarea.owner} className={`p-4 my-2 shadow-sm rounded-xl border ${tarea.isprivate ? "border-yellow-400 border-2" : "border-slate-300"} bg-gray-200 dark:bg-gray-950`}>
                        <div className="flex justify-between">
                            <div className="my-auto">
                                <span className="font-bold text-lg">{tarea.owner}</span>
                            </div>
                            {tarea.owner == user.email ?
                                <div className="my-auto">
                                    <DeleteButton id={tarea._id.toJSON()} />
                                </div> : ""}
                        </div>
                        <div>
                            <span>{tarea.task}</span>
                        </div>

                    </li>

                ))}
            </ul>
        )
    else return (<p>{"No hay tareas creadas :("}</p>)
}