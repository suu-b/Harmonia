import axios from "axios"
import getCookie from "./getCookie"

interface FileDetailsProps {
    accessToken: string
    fileId: string
}

interface FolderDetailsProps {
    accessToken: string
    folderID: string
}

interface FinalDataTreeStructure {
    id: string
    name: string
    mimetype: string
    children?: FinalDataTreeStructure[] | null
}

const fetchFileDetails = async ({
    accessToken,
    fileId,
}: FileDetailsProps): Promise<FinalDataTreeStructure | null> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-file`,
            {
                accessToken,
                fileID: fileId,
            }
        )

        const file = response.data
        return prepareDataTreeStructure(file.id, file.name, file.mimeType, null)
    } catch (e) {
        console.error("ERROR: Fetching file details:", e)
        return null
    }
}

const fetchFolderDetails = async ({
    accessToken,
    folderID,
}: FolderDetailsProps): Promise<FinalDataTreeStructure | null> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-folder`,
            {
                accessToken,
                folderID,
            }
        )

        const folder = response.data.files 
        const children = await Promise.all(
            folder.map(async (child: any) => {
                if (child.mimeType === "application/vnd.google-apps.folder") {
                    return fetchFolderDetails({
                        accessToken,
                        folderID: child.id,
                    })
                } else {
                    return fetchFileDetails({ accessToken, fileId: child.id })
                }
            })
        )

        return prepareDataTreeStructure(
            folderID,
            response.data.name,
            "application/vnd.google-apps.folder",
            children
        )
    } catch (e) {
        console.error("ERROR: Fetching folder details:", e)
        return null
    }
}

const prepareDataTreeStructure = (
    id: string,
    name: string,
    mimetype: string,
    children: FinalDataTreeStructure[] | null = null
): FinalDataTreeStructure => {
    return { id, name, mimetype, children }
}

const formatWorkspaceUtils = async (
    apiResponse: any[]
): Promise<FinalDataTreeStructure[]> => {
    const accessToken = getCookie("accessToken")

    if (!accessToken) {
        console.error("Access token is missing.")
        return []
    }

    const preparedData: FinalDataTreeStructure[] = await Promise.all(
        apiResponse.map(async (packageData: any) => {
            const children = packageData.mimeType === "application/vnd.google-apps.folder"
                ? await fetchFolderDetails({ accessToken, folderID: packageData.id })
                : null

            return prepareDataTreeStructure(
                packageData.id,
                packageData.name,
                packageData.mimeType,
                children ? [children] : null
            )
        })
    )

    return preparedData
}

export default formatWorkspaceUtils
