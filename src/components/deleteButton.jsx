"use client"

import { useTransition } from "react"
import { deleteTask } from "@/app/deleteTask";

export default function DeleteButton({id}) {
    let [isPending, startTransition] = useTransition()

    return (
        <button
            disabled={isPending}
            onClick={() => startTransition(() => deleteTask(id))}
            className='bg-slate-600 rounded-lg my-auto mx-2 px-4 py-2 text-slate-200 disabled:bg-gray-400'>
            {isPending ?
                    <svg className="animate-spin h-5 w-5 bg-slate-600" viewBox="0 0 24 24" />
                : "X"
            }
        </button>
    )
}