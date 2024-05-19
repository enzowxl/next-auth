import { validateUser } from '@/utils/validate-user'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const handler = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const authSchema = z
            .object({
              email: z.string().email(),
              password: z.string().min(6),
            })
            .parseAsync(credentials)

          const { email, password } = await authSchema

          const user = await validateUser(email, password)

          return user
        } catch (err) {
          throw new Error('Oops! Something went wrong')
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
