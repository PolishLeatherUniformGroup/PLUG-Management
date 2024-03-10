import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function addFee(req:NextRequest){
    let res = new NextResponse();
    const endpoint = `${process.env.PLUG_API_URL}membership/commands/add-fee`;
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(req.body)
    });
    return res;
}