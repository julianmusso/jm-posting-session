"use client"

import { experimental_useFormStatus as useFormStatus } from "react-dom"

export default function AddButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type='submit'
            className='bg-slate-600 inline-flex items-center rounded-lg mx-2 p-4 text-slate-200 disabled:bg-gray-400'>
            {pending ?
                <>
                    <svg className="animate-spin h-5 w-5 mr-3 bg-slate-600" viewBox="0 0 24 24" />
                    Publicando...
                </>
                : "Publicar"
            }
        </button>
    )
}