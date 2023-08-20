import AddButton from '@/components/addButton';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import TareasList from '@/components/tareasList';
import taskSchema from './taskSchema';
import dbConnect from './connection';
import addTarea from './addTask';

export const dynamic = 'auto'

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  // CONECTO A BASE DE DATOS
  dbConnect();

  const fulldata = []

  const publicPostsPromise = taskSchema.find({ isprivate: false })
  const privatePostsPromise = taskSchema.find({ owner: user?.email, isprivate: true })

  const [publicPosts, privatePosts] = await Promise.all([publicPostsPromise, privatePostsPromise])
  const data = publicPosts.concat(privatePosts)

  console.log(data)
  const myposts = data.filter(p => p.owner === user?.email).length

  const tareas = data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl font-bold my-2'>Publicaciones</h1>
      {user ?
        <>
          <h2 className='text-xl my-1'>Usuario: {user.name}</h2>
          <p className='text-lg my-1'>Tienes un total de: {myposts} publicaciones</p>
          <Link href="./api/auth/signout" className='my-2 border-2 rounded-lg px-4 py-2 border-slate-400'>Desloguear</Link>

          <form action={addTarea} className='my-4'>
            <div className='my-auto'>
              <input type="checkbox" name='isprivate'
                className='my-4 mr-2 scale-125' /> ¿Es privado?
            </div>
            <input type="text" name="tarea" required
              className='border border-gray-300 text-slate-800 rounded-lg py-4 px-4' />
            <AddButton />
          </form>
          <TareasList tareas={tareas} />

        </>
        :
        <>
          <h2 className='text-xl'>HELLO ANNONYMOUS, PLEASE SIGN IN!</h2>
          <Link
            href="./api/auth/signin"
            className='bg-slate-600 inline-flex items-center rounded-lg mx-2 p-4 text-slate-200'>
            SIGN IN</Link>
        </>
      }



    </main>
  )
}
