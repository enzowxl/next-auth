import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ProviderContext } from '@/context/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Base | Next Auth',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderContext>{children}</ProviderContext>
      </body>
    </html>
  )
}
