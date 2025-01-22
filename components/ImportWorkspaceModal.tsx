"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Modal from './Modal'
import axios from "axios"
import { FaRegCheckCircle } from "react-icons/fa"
import { BarLoader } from "react-spinners"
import setCookie from "@/utils/setCookie"

interface ImportWorkSpaceModalProps {
    accessToken: string;
}

const ImportWorkSpaceModal: React.FC<ImportWorkSpaceModalProps> = ({ accessToken }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [importDone, isImportDone] = useState<boolean>(false)

    const importWorkspace = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/import-workspace`, { accessToken: accessToken, folderName: "harmonia-workspace" })
            console.log(response.data)
            const workspace_id = response.data[0].id
            setCookie({ cookieName: "workspace_id", cookieVal: workspace_id, expiryDays: 5 })
            isImportDone(true)
        }
        catch (e) {
            console.error("ERROR: Fetching user docs:" + e)
        }
    }

    useEffect(() => {
        importWorkspace()
    }, [])

    return (
        <section id="import-workspace" className="flex flex-col justify-center h-screen bg-white items-center w-full p-8">
            <Image
                src="/importing-snoopy.png"
                alt="import-banner"
                width={200}
                height={200}
            />
            <h3 className="text-4xl font-bold text-slate-800 my-1">Let's import your workspace</h3>
            <p className="text-sm text-slate-400 mb-5 text-center ">Harmonia would try to fetch the workspace from your drive. It can either be first time or a whole merging process to up-to-date the application with the latest changes in the workspace.</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setIsOpen(true)}
            >
                Trigger Import
            </button>
            <Modal isOpen={isOpen} importDone={importDone} onClose={() => importDone && setIsOpen(!isOpen)}>
                <Image
                    src="/importing-snoopy.png"
                    alt="import-workspace"
                    width={200}
                    height={200}
                />
                {importDone ?
                    <>
                        <h3 className="text-slate-700 font-bold mt-5 text-base">Importing Successfull.</h3>
                        <p className="text-slate-500 text-sm my-1 text-center">Now, you would find your workspace setup in the workspace section. Click anywhere in background to continue. Merry writing...</p>
                        <FaRegCheckCircle color="black" size={40} className="mt-5" />
                    </> :
                    <>
                        <h3 className="text-slate-700 font-bold mt-5 text-base my-3">Importing Workspace...</h3>
                        <p className="text-slate-500 text-sm my-1 text-center">The process is undoabale. Do not close screen or attempt to close the popup.</p>
                        <BarLoader width={200} height={5} />
                    </>}
            </Modal>
        </section>

    )
}

export default ImportWorkSpaceModal