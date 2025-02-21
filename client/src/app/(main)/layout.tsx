import '../globals.css'
import '@/lib/dayjs'

import type { Metadata } from 'next'
import Providers from '@/components/layout/providers'
import Sidebar from '@/components/layout/sidebar'

import { Poppins } from 'next/font/google'
import { SidebarProvider } from '@/components/shadcn/sidebar'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex overflow-y-hidden h-screen min-w-[650px]`}
      >
        <SidebarProvider>
          <Providers>
            <Sidebar />
            <main className="flex-1 h-full">{children}</main>
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  )
}
