'use client'
import { signOut, useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data } = useSession()
  return (
    <main className="flex gap-5 flex-col justify-center items-center min-h-screen">
      <h1>{data?.user?.email}</h1>
      <button
        onClick={() => signOut()}
        className="bg-zinc-900 p-2 rounded-xl"
        type="submit"
      >
        Log Out
      </button>
    </main>
  )
}
