import { NextRequest, NextResponse } from "next/server";
import { RedirectType, redirect } from 'next/navigation'
import { getAccessToken } from "@auth0/nextjs-auth0";

export const POST = async function sendApplication(req:NextRequest){
    const endpoint = `${process.env.PLUG_API_URL}membership/commands/create-member`;
    const payload= await req.json();
    const res = new NextResponse();
    const {accessToken} = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    });
    redirect('/members', RedirectType.push );
}

export const GET = async function getApplications(req:NextRequest){
    const endpoint = `${process.env.PLUG_API_URL}membership/members`;
    const res = new NextResponse();
    const {accessToken} = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
  
    const members = await response.json();
    return NextResponse.json(members.data);
}