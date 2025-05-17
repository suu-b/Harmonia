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
        console.log("Lets see")
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
        console.log("We saw")
        return response.data;
      } catch (e) {
        console.error(`ERROR: Creating folder of name: ${folderName}:` + e);
      }
    };