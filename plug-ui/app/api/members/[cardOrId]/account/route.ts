import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function createAccount(req:NextRequest,{ params: { cardOrId } }: { params: { cardOrId: string } }){
    let res = new NextResponse();

    const endpoint = `${process.env.PLUG_API_URL}membership/commands/create-account`;

    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({card: cardOrId})
    });
    return res;
} 