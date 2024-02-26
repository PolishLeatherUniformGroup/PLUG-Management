import { FeeItemDto } from "@/app/models/FeeDto";
import { RecommendationItemDto } from "@/app/models/recommendation-items";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function getMemberFees(req: NextRequest,
    { params: { cardOrId } }: { params: { cardOrId: string } }) {
    let id: string;
    
    let res = new NextResponse();
    if (cardOrId === "me") {
        const session = await getSession(req, res); 
        id= session?.user.nickname;
    }else{
        id = cardOrId;
    }

    const endpoint = `${process.env.PLUG_API_URL}apply/members/${id}/recommendations`;

    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const recommendationsResponse = await response.json();

    const mapped = recommendationsResponse.data.map((recommendation: any) => ({
        ...recommendation
    } as RecommendationItemDto));
    console.log(mapped);
    return NextResponse.json(mapped);
}