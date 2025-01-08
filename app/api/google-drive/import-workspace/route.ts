import { NextResponse } from "next/server";

interface RequestBody {
    accessToken: string;
    folderName: string;
}

export async function POST(request: Request) {
    const { accessToken, folderName }: RequestBody = await request.json();

    if (!accessToken || !folderName) {
        return NextResponse.json(
            { error: "Access token and folder name are required" },
            { status: 400 }
        );
    }

    try {
        const query = encodeURIComponent(`mimeType='application/vnd.google-apps.folder' and name='${folderName}'`);
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}`, {
            method: "GET", 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            return NextResponse.json(
                { error: "Failed to fetch folder", details: errorDetails },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
