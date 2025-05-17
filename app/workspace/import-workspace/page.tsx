"use client"

import ImportWorkSpaceModal from "@/components/ImportWorkspaceModal"
import getCookie from "@/utils/getCookie"

const ImportWorkSpacePage: React.FC = () => {
    const accessToken = getCookie("accessToken")
    
    if (!accessToken) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <ImportWorkSpaceModal accessToken={accessToken} />
        </>
    )
}

export default ImportWorkSpacePage