import getCookie from "./cookies/getCookie"
import { fetchFileById, fetchFolderById } from "@/lib/googleDrive"

interface FileItem  {
    id: string;
    name: string;
    mimeType: string;
};

interface FileDetailsProps {
    accessToken: string
    fileId: string
}

interface FolderDetailsProps {
    accessToken: string
    folderID: string,
    folderName: string
}

interface FinalDataTreeStructure {
    id: string
    name: string
    mimetype: string
    children?: FinalDataTreeStructure[] | null
}



/**
 * Takes in the raw response from the Google Drive API and formats it into a tree structure.
 * It fetches the details of each folder and file recursively.
 * @param apiResponse - The response from the Google Drive API containing file and folder data
 * @returns 
 */
const returnWorkspaceDataInRequiredFormat = async (
    apiResponse: FileItem[]
): Promise<FinalDataTreeStructure[]> => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
        console.error("Access token is missing.");
        return [];
    }

    const preparedData: (FinalDataTreeStructure | null)[] = await Promise.all(
        apiResponse.map(packageData =>
            packageData.mimeType === "application/vnd.google-apps.folder"
                ? fetchFolderDetails({
                      accessToken,
                      folderID: packageData.id,
                      folderName: packageData.name
                  })
                : null
        )
    );

    // Filters out any null values from failed fetches
    return preparedData.filter(Boolean) as FinalDataTreeStructure[];
};

export default returnWorkspaceDataInRequiredFormat

/**
 * Helper to fetch the details of a file by its ID from Google Drive.
 * @param accessToken - The access token of the user
 * @param fileId - The ID of the file to fetch
 * @returns 
 */
const fetchFileDetails = async ({
    accessToken,
    fileId,
}: FileDetailsProps): Promise<FinalDataTreeStructure | null> => {
    return fetchFileById(accessToken, fileId)
        .then(file => {
            if (file) {
                return prepareDataTreeStructure(
                    file.id,
                    file.name,
                    file.mimeType,
                    null
                );
            } else {
                console.error("File not found");
                return null;
            }
        })
        .catch(error => {
            console.error("Error fetching file:", error);
            return null;
        });
};

/**
 * Helper to fetch the details of a folder by its ID from Google Drive.
 * It recursively fetches the details of all files and folders within the folder.
 * @param accessToken - The access token of the user
 * @param folderID - The ID of the folder to fetch
 * @param folderName - The name of the folder to fetch
 * @returns 
 */
const fetchFolderDetails = async ({
    accessToken,
    folderID,
    folderName
}: FolderDetailsProps): Promise<FinalDataTreeStructure | null> => {
    return fetchFolderById(accessToken, folderID)
        .then(response => {
            if (!response) {
                console.error("Folder not found");
                return null;
            }

            const folder = response.files;

            return Promise.all(
                folder.map((child: FileItem) => {
                    if (child.mimeType === "application/vnd.google-apps.folder") {
                        return fetchFolderDetails({
                            accessToken,
                            folderID: child.id,
                            folderName: child.name
                        });
                    } else {
                        return Promise.resolve(
                            prepareDataTreeStructure(
                                child.id,
                                child.name,
                                child.mimeType,
                                null
                            )
                        );
                    }
                })
            ).then(children => {
                return prepareDataTreeStructure(
                    folderID,
                    folderName,
                    "application/vnd.google-apps.folder",
                    children
                );
            });
        })
        .catch(error => {
            console.error("Error fetching folder:", error);
            return null;
        });
};

/**
 * Helper to prepare the data tree structure for the final output.
 * @param id - The ID of the file or folder
 * @param name - The name of the file or folder
 * @param mimetype - The MIME type of the file or folder
 * @param children - The children of the folder (if any)
 * @returns
 */
const prepareDataTreeStructure = (
    id: string,
    name: string,
    mimetype: string,
    children: FinalDataTreeStructure[] | null = null
): FinalDataTreeStructure => {
    return { id, name, mimetype, children }
}
