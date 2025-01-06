"use client"

import { Poppins } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import { AnimatePresence } from "framer-motion"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Harmonia</title>
        <meta name="description" content="Research. Create. Note. Sync" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <main className="grid-background bg-slate-100 h-[100vh] flex justify-center items-center flex-col"><AnimatePresence mode="wait" initial={false}><SessionProvider>{children}</SessionProvider></AnimatePresence></main>
      </body>
    </html>
  )
}
