import { createUser } from '@/utils/create-user'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const registerSchema = z
      .object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parseAsync(await req.json())

    const { username, email, password } = await registerSchema

    await createUser(username, email, password)

    return NextResponse.json({ message: 'Ok' }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 400 })
  }
}
