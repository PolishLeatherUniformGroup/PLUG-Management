import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function getMember(req: NextRequest,
    { params: { cardOrId } }: { params: { cardOrId: string } }) {
    let id: string;
    
    let res = new NextResponse();
    if (cardOrId === "me") {
        const session = await getSession(req, res); 
        id= session?.user.nickname;
    }else{
        id = cardOrId;
    }

    res = new NextResponse();
    const endpoint = `${process.env.PLUG_API_URL}membership/members/${id}`;

    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const member = await response.json();
    return NextResponse.json(member);
}