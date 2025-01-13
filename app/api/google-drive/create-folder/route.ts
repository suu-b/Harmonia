import { NextResponse } from "next/server"

interface FolderRequest {
    name: string,
    mimeType: string,
    parents?: string
}

interface RequestBody {
    accessToken: string,
    folderRequest: FolderRequest
}

export async function POST(request: Request) {
    const { accessToken, folderRequest }: RequestBody = await request.json()
    if (!accessToken || !folderRequest) {
        console.log(accessToken)
        console.log(folderRequest)
        return NextResponse.json(
            { error: "Access token and request body are required" },
            { status: 400 }
        )
    }
    try {
        console.log("Folder:" + folderRequest)
        const response = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(folderRequest, null, 2),
        },)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}