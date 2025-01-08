"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Modal from './Modal'
import axios from "axios"
import { FaRegCheckCircle } from "react-icons/fa"
import { BarLoader } from "react-spinners"

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
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setIsOpen(true)}
            >
                Open Modal
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
                <Image
                    src="/importing-snoopy.png"
                    alt="import-workspace"
                    width={200}
                    height={200}
                />
                {importDone ?
                    <>
                        <h3 className="text-slate-700 font-bold mt-5 text-base my-3">Importing Successfull!</h3>
                        <FaRegCheckCircle />
                    </> :
                    <>
                        <h3 className="text-slate-700 font-bold mt-5 text-base my-3">Importing Workspace...</h3>
                        <BarLoader width={200} height={5} />
                    </>}
            </Modal>
        </>

    )
}

export default ImportWorkSpaceModal