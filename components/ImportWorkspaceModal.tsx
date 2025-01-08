"use client"

import { useState } from "react"
import Image from "next/image"
import Modal from './Modal'
import { BarLoader } from "react-spinners"

const ImportWorkSpaceModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
                <h3 className="text-slate-700 font-bold mt-5 text-base my-3">Importing Workspace...</h3>
                <BarLoader width={200} height={5} />
            </Modal>
        </>

    )
}

export default ImportWorkSpaceModal