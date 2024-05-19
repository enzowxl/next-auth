import { IncorrectUser } from '@/errors/incorrect-user'
import { prisma } from '@/prisma'
import { compare } from 'bcryptjs'

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) throw new IncorrectUser()

  const passwordHash = await compare(password, user?.password)

  if (!passwordHash) throw new IncorrectUser()

  return user
}
