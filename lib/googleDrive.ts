import axios from "axios"; 

/**
 * Fetches all files from the user's Google Drive.
 * @param accessToken - The access token of the user
 */
export const fetchUserDocumentsFromGDrive = async (accessToken: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/all-files`,
        { accessToken: accessToken }
      );
      return response.data;
    } catch (e) {
      console.error("ERROR: Fetching User Documents from Google Drive:", e);
    }
};

/**
 * Fetches a folder by its ID from the user's Google Drive.
 * @param accessToken - The access token of the user
 * @param folderID - The ID of the folder to fetch
 */
export const fetchFolderById = async (accessToken: string, folderID: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-folder`,
          {
            accessToken: accessToken,
            folderID: folderID,
          }
        );
        return response.data;
      } catch (e) {
        console.error(`ERROR: Fetching data for folder of id: ${folderID}:` + e);
      }
    };

/**
 * Creates a folder in the user's Google Drive.
 * @param accessToken - The access token of the user
 * @param folderName - The name of the folder to create
 */    
export const createFolder = async (accessToken: string, folderName: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/create-folder`,
          {
            accessToken: accessToken,
            folderRequest: {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
          },
          }
        );
        return response.data;
      } catch (e) {
        console.error(`ERROR: Creating folder of name: ${folderName}:` + e);
      }
    };

/**
 * Imports a folder into the user's Google Drive.
 * @param accessToken - The access token of the user
 * @param folderName - The name of the folder to import
 * @returns 
 */
 export const importFolder = async (accessToken: string, folderName: string) => {
  try{
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/import-workspace`,
      {
        accessToken: accessToken,
        folderName: folderName,
      }
    );
    return response.data;
     } catch (e) {
        console.error(`ERROR: Importing folder of name: ${folderName}` + e)
     }
 }   


 /**
  * Gets a file by its ID from the user's Google Drive.
  * @param accessToken - The access token of the user
  * @param fileId - The ID of the file to fetch
  * @returns 
  */
 export const fetchFileById = async (accessToken: string, fileId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-file`,
      {
        accessToken: accessToken,
        fileID: fileId,
      }
    );
    return response.data;
  } catch (e) {
    console.error(`ERROR: Fetching file of id: ${fileId}:` + e);
  }
}
