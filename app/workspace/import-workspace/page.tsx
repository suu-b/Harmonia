"use client"

import ImportWorkSpaceModal from "@/components/ImportWorkspaceModal"
import { useSession } from "next-auth/react"

const ImportWorkSpacePage: React.FC = () => {
    const { data: session } = useSession()
    if (!session?.accessToken) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <ImportWorkSpaceModal accessToken={session.accessToken} />
        </>
    )
}

export default ImportWorkSpacePage