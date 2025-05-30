import { NextResponse } from "next/server"

interface RequestBody {
    accessToken: string,
    folderID: string
}

export async function POST(request: Request) {
    const { accessToken, folderID }: RequestBody = await request.json()
    if (!accessToken || !folderID) {
        console.log(accessToken)
        console.log(folderID)
        return NextResponse.json(
            { error: "Access token and folder id are required" },
            { status: 400 }
        )
    }
    try {
        const query = encodeURIComponent(`'${folderID}' in parents`)
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,parents,createdTime,modifiedTime,description)`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        },)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}