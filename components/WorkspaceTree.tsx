import axios from 'axios'
import { useEffect, useState } from "react"
import TreeView from "./TreeView"
import formatWorkspaceUtils from '@/utils/formatWorkspaceUtils'
import { MoonLoader } from 'react-spinners'

interface NoWorkspaceProps {
    accessToken: string | null
    cookieValue: string
}

interface file {
    id: string
    mimeType: string
    name: string
    parents: string[]
}

const WorkspaceTree: React.FC<NoWorkspaceProps> = ({ accessToken, cookieValue }) => {
    const [data, setData] = useState<FinalDataTreeStructure[]>([])
    useEffect(() => { handleGetWorkspace() }, [])

    const handleGetWorkspace = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-folder`, {
                accessToken: accessToken, folderID: cookieValue
            })
            const formattedResponse: FinalDataTreeStructure[] = await formatWorkspaceUtils(response.data.files)
            setData(formattedResponse)
        }
        catch (e) {
            console.error("ERROR: Fetching user docs:" + e)
        }
    }

    return (
        <div className='w-full overflow-auto p-3 pt-8 tree'>{data ? <TreeView data={data} /> : <MoonLoader />} </div>
    )
}

export default WorkspaceTree