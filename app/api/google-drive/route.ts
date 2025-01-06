import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { accessToken } = await request.json()
    if (!accessToken) {
        return NextResponse.json({ error: "Acesss Token is required" }, { status: 400 })
    }
    try {
        const response = await fetch('https://www.googleapis.com/drive/v3/files?q=mimeType="application/vnd.google-apps.document"', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}