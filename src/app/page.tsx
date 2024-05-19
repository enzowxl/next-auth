'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export default function Home() {
  const route = useRouter()
  const searchParams = useSearchParams()

  const method = searchParams.get('method') as 'login' | 'register'

  function changeMethod() {
    if (method === 'login' || method === null) {
      route.push('?method=register')
    } else {
      route.push('?method=login')
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const username = data.username
    const email = data.email
    const password = data.password

    await axios.post('/api/auth/register', {
      username,
      email,
      password,
    })
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const email = data.email
    const password = data.password

    await signIn('credentials', {
      email,
      password,
    })
  }

  return (
    <main className="flex gap-10 flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-4xl">
        {method === 'login' || method === null ? 'Sign In' : 'Sign Up'}
      </h1>
      <form
        className="flex gap-5 flex-col"
        onSubmit={
          method === 'login' || method === null ? handleLogin : handleRegister
        }
      >
        {method === 'register' && (
          <div className="flex w-[320px] items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3 ring-zinc-700">
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              name="username"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
        )}
        <div className="flex w-[320px] items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3 ring-zinc-700">
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="flex w-[320px] items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3 ring-zinc-700">
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            name="password"
            type="password"
            placeholder="***********"
            required
          />
        </div>
        <button className="bg-zinc-900 p-2 rounded-xl" type="submit">
          {method === 'login' || method === null ? 'Sign In' : 'Sign Up'}
        </button>
        <span className="text-center cursor-pointer" onClick={changeMethod}>
          Change method
        </span>
      </form>
    </main>
  )
}
