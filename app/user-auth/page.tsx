"use client"

import { BeatLoader } from 'react-spinners'
import Image from "next/image"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


const UserAuthPage: React.FC = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    // const fetchUserDocs = async (accessToken: string) => {
    //     try {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive`, { accessToken: accessToken })
    //         return response.data
    //     }
    //     catch (e) {
    //         console.error("ERROR: Fetching user docs:" + e)
    //     }
    // }

    useEffect(() => {
        if (session?.user) {
            setTimeout(() => {
                router.push('workspace')
            }, 3000)
        }
    }, [session?.user])


    if (status === "loading") {
        return <p>Loading...</p>
    }
    if (!session) {
        return <p>You are not signed in</p>
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
        >
            <div className="grid-background h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="bg-white w-fit h-fit shadow border rounded p-10 flex flex-col justify-center items-center">
                    <h3 className="text-lg text-slate-800 tracking-wider">HARMONIA</h3>
                    <h1 className="text-4xl font-bold text-slate-800 my-3">Welcome, <span className="text-blue-300">{session.user?.name}</span></h1>
                    {session.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="Profile Image"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    )}
                    <p className='font-semibold text-slate-600 mt-5 mb-2'>Harmonia is setting up your workspace...</p>
                    <BeatLoader color="#1E293B" size={15} />
                </div>
            </div>
        </motion.div>
    )
}

export default UserAuthPage