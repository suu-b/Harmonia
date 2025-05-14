"use client"

import Image from "next/image"
import { FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { motion } from 'framer-motion'
import { useState } from "react"
import { MoonLoader } from "react-spinners"
import { Button } from "@/components/ui/button"

/**
 * The component for the home page.
 * It displays a banner image, a heading, and a button to sign in with Google.
 */
const Home: React.FC = () => {
  /**
   * Loading state to show the loading spinner when the user clicks the sign in button. Solely to cover the time taken by the next-auth to redirect to the user-auth page/the google sign in card.
   */
  const [loading, setIsLoading] = useState<Boolean>(false)

  /**
   * The function sets the loading to true and calls the inbuilt signIn function from next-auth to sign in with Google. Next-auth will handle the rest of the authentication process. And Once the user is authenticated, it will redirect to the user-auth page.
   */
  const handleGoogleSignIn = () => {
    setIsLoading(true)
    signIn("google", { callbackUrl: "/user-auth" })
  }

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 3 }}
      >
        <section id="banner" className="flex justify-center items-center">
          <Image
            src="/home-banner.jpg"
            alt="home-banner"
            width={1250}
            height={250}
            className="rounded-lg shadow-lg border"
          />
        </section>
        <section id="heading" className="mt-8 flex flex-col items-center justify-center">
          <h1 className="font-black text-slate-900 text-7xl">HARMONIA</h1>
          <p className="text-slate-600 text-base w-[85%] text-center mt-1">Organize, sync and access your notes effortlessly with our web-app, seamlessly integrated with Google Drive for ultimate convenience</p>
          <h2 className="text-lg text-slate-700 font-extrabold my-3">Research. Create. Note. Sync</h2>
          <div className="h-24">{loading ? <MoonLoader className="my-2" size={25} /> : 
              <Button onClick={handleGoogleSignIn} variant="default" size="lg" className="gap-2">
                Continue with Google
                <FaGoogle size={18} />
              </Button>
          }</div>
        </section>
      </motion.div>
    </main>
  )
}

export default Home

