import { NextResponse } from "next/server"

/**
 * This API route updates the metadata of a file in Google Drive.
 * It requires an access token and a file ID to identify the file to be updated.
 * The request body should contain the access token and file ID.
 * REMEMBER: Folder is also a kinda file in Google Drive hence the file ID is used to identify both files and folders.
 */
interface RequestBody {
    accessToken: string
    fileID: string
    metadata: {
        name?: string
        description?: string}
}

export async function PATCH(request: Request) {
    const { accessToken, fileID, metadata}: RequestBody = await request.json()

    if (!accessToken || !fileID) {
        return NextResponse.json(
            { error: "Access token and file id are required" },
            { status: 400 }
        )
    }
    if (!metadata.name && !metadata.description) {
        return NextResponse.json(
            { error: "Provide atleast one: new name or the description for the file" },
            { status: 400 }
        )
    }


    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileID}/?fields=name,description
`, {
            method: "PATCH", 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(metadata)
        })

        if (!response.ok) {
            const errorDetails = await response.json()
            return NextResponse.json(
                { error: "Failed to update the metadata", details: errorDetails },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
