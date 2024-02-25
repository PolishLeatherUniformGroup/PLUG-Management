import { FeeItemDto } from "@/app/models/FeeDto";
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

    const endpoint = `${process.env.PLUG_API_URL}membership/members/${id}/fees`;

    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const feesResponse = await response.json();
    console.log(feesResponse);
    const mapped =feesResponse.data.map((fee: any) => {
        return{
        id: fee.feeId,
        year: fee.year,
        requiredFee: `${fee.dueAmount.amount} ${fee.dueAmount.currency}`,
        paidFee: `${fee.paidAmount.amount} ${fee.paidAmount.currency}`,
        requiredFeeDate: fee.dueDate,
        paidFeeDate: fee.paidDate,
        currency: fee.dueAmount.currency
    } as FeeItemDto})
    console.log(mapped);
    return NextResponse.json(mapped);
}