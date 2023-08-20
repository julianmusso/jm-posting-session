"use server"

import taskSchema from './taskSchema';
import dbConnect from './connection';
import { revalidatePath } from 'next/cache';

export async function deleteTask(taskId) {
    dbConnect()
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await taskSchema.findByIdAndDelete(taskId)
        revalidatePath("/");
    } catch (error){
        console.error(error)
    }
}