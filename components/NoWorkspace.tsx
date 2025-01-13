import { MdOutlineCreateNewFolder } from "react-icons/md"
import axios from 'axios'
import { useState } from "react"
import { MoonLoader } from "react-spinners"

interface NoWorkspaceProps {
    accessToken: string | null
}

const NoWorkspace: React.FC<NoWorkspaceProps> = ({ accessToken }) => {
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const handleWorkspaceCreation = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/create-folder`, {
                accessToken: accessToken, folderRequest: {
                    name: "harmonia-workspace",
                    mimeType: "application/vnd.google-apps.folder",
                }
            })
            console.log(response.data)
        }
        catch (e) {
            console.error("ERROR: Fetching user docs:" + e)
        }
        setIsLoading(false)
    }

    return (
        <div className="text-slate-600 text-sm font-semibold flex justify-center items-center flex-col">
            <h3 className="text-center">No Workspace found. Lets make one 🤩!</h3>
            {isLoading ? <MoonLoader size={25} className="m-1.5"/>: <button className="bg-slate-600 p-2 rounded mt-3 hover:shadow" onClick={handleWorkspaceCreation}><MdOutlineCreateNewFolder size={15} color="white" /></button> }
        </div>
    )
}

export default NoWorkspace