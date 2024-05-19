import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'

export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  const passwordHash = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
    },
  })

  return user
}
