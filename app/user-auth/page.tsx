"use client"

import { BeatLoader, ClimbingBoxLoader } from 'react-spinners'
import Image from "next/image"
import { useSession } from "next-auth/react"

const UserAuthPage: React.FC = () => {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>You are not signed in</p>
    }

    return (
        <div className="grid-background h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white w-[30vw] h-[30vw] shadow border rounded p-8 flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold text-slate-800 tracking-wider">HARMONIA</h3>
                <h1 className="text-4xl font-bold text-slate-800">Welcome, <span className="text-blue-300">{session.user?.name}</span></h1>
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
    )
}

export default UserAuthPage