import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
export const POST = async  function confirmRecommendation(req: NextRequest){

    let id: string;
    const requestBody = await req.json();
    console.log(requestBody);
    let res = new NextResponse();
    const session = await getSession(req, res);
    id = session?.user.nickname;
    const endpoint = `${process.env.PLUG_API_URL}apply/commands/confirm-recommendation`;

    const { accessToken } = await getAccessToken(req, res);
    const command = {
        id: requestBody.applicantId,
        recommendationId: requestBody.recommendationId
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(command)
    });
    return NextResponse.json(response, {status: response.status});
}
