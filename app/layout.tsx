"use client"

import { Poppins } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { AnimatePresence } from "framer-motion"

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins",
})

/**
 * RootLayout component
 * It wraps the entire application with a layout that includes a background, font, and session provider.
 * The background is a grid pattern, and the font is Poppins.
 * The session provider is used to manage the authentication state of the user by next-auth.
 * AnimatePresence is used to animate the children components when they are mounted or unmounted.
 */
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
