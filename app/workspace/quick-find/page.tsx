"use client"

import { CiSearch } from "react-icons/ci"
import Image from "next/image"
import { BeatLoader } from 'react-spinners'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

interface GoogleDriveDocument {
    id: string;
    kind: string;
    mimeType: string;
    name: string;
}

const QuickFindPage: React.FC = () => {
    const { data: session } = useSession()
    const [userDocuments, setUserDocuments] = useState<GoogleDriveDocument[] | null>(null)
    const [results, setResults] = useState<GoogleDriveDocument[] | null>(null)
    const [query, setQuery] = useState<string>("")

    const fetchUserDocs = async (accessToken: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/all-files`, { accessToken: accessToken })
            return response.data
        }
        catch (e) {
            console.error("ERROR: Fetching user docs:" + e)
        }
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchItem = e.target.value.toLowerCase()
        setQuery(searchItem)
    }

    const handleSearch = () => {
        if (userDocuments) {
            const filtered = userDocuments.filter((item: GoogleDriveDocument) => item.name.toLowerCase().includes(query))
            setResults(filtered)
        }
    }

    useEffect(() => {
        if (session?.accessToken) {
            fetchUserDocs(session.accessToken).then(data => {
                console.log(data.files)
                setUserDocuments(data.files)
                setResults(data.files)
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
            <div className="flex justify-center items-center w-[80%]">
                <input type="text" placeholder="Search for your documents here 🔍..." onChange={handleQueryChange} className="w-full focus:border-blue-400 focus:ring-0 text-sm rounded border shadow bg-slate-100 p-2 text-slate-800" />
                <CiSearch className="bg-slate-800 p-1 rounded-lg ml-2 cursor-pointer" onClick={handleSearch} size={38} />
            </div>
            <div id="drive-docs" className="w-full flex justify-center items-start flex-col gap-4 p-10">
                {userDocuments ?
                    <ol className="w-full">
                        <h3 className="font-bold text-sm text-slate-800 p-1">Document</h3>
                        <hr className="mb-3" />
                        {results && results.length === 0 && <h3 className="w-full text-center text-slate-800 text-sm">No results found</h3>}
                        {results && results.map(doc =>
                            <div className="w-full" key={doc.id}>
                                <li className="text-slate-800 text-sm my-2 cursor-pointer hover:bg-slate-200 p-3 rounded pl-1">{doc.name}</li>
                                <hr />
                            </div>
                        )}
                    </ol>
                    : <BeatLoader color="#1E293B" size={20} className="m-auto" />}
            </div>
        </section>
    )
}

export default QuickFindPage