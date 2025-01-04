"use client"

import Image from "next/image"
import { BeatLoader } from 'react-spinners'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const QuickFindPage: React.FC = () => {
    const { data: session } = useSession()
    const [userDocuments, setUserDocuments] = useState([])

    const fetchUserDocs = async (accessToken: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive`, { accessToken: accessToken })
            return response.data
        }
        catch (e) {
            console.error("ERROR: Fetching user docs:" + e)
        }
    }

    useEffect(() => {
        if (session?.accessToken) {
            fetchUserDocs(session.accessToken).then(data => {
                setUserDocuments(data.files)
            })
        }
    }, [session?.accessToken])

    return (
        <section id="quickfind" className="flex flex-col justify-center h-screen bg-white items-center w-full p-8">
            <Image
                src="/detective-snoopy.png"
                alt="home-banner"
                width={200}
                height={200}
            />
            <h3 className="text-4xl font-bold text-slate-800 my-1">Find your drive documents here</h3>
            <p className="text-sm text-slate-400 mb-5 text-center ">You could search for the documents from the google drive here. You can even import them to your workspace. No need to visit G-drive. Access everything relevant here. Amazing, isn't it?</p>
            <input type="text" placeholder="Search for your documents here..." className="w-[80%] focus:border-blue-400 focus:ring-0 rounded border shadow bg-slate-100 p-3 text-slate-800" />
            <div id="drive-docs" className="flex justify-center items-center flex-col gap-4 p-10">
                {userDocuments ?
                    <ol>
                        {userDocuments.map(doc => 
                            <li className="text-slate-800" key={doc.name}>{doc.name}</li>
                        )}
                    </ol>
                    : <BeatLoader color="#1E293B" size={20} />}
            </div>
        </section>
    )
}

export default QuickFindPage