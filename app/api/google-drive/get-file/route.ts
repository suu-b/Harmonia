import { NextResponse } from "next/server"

interface RequestBody {
    accessToken: string
    fileID: string
}

export async function POST(request: Request) {
    const { accessToken, fileID }: RequestBody = await request.json()

    if (!accessToken || !fileID) {
        console.log(accessToken)
        console.log(fileID)
        return NextResponse.json(
            { error: "Access token and file ID are required" },
            { status: 400 }
        )
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileID}?fields=id,name,mimeType,parents,size,modifiedTime`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        )

        if (!response.ok) {
            throw new Error(`Google API error: ${response.statusText}`)
        }

        const data = await response.json()
        console.log(data)
        return NextResponse.json(data)
    } catch (error: any) {
        console.error("Error fetching file:", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
