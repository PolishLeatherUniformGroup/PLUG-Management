import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function registerPayment(req:NextRequest){
    const res = new NextResponse();
    const endpoint = `${process.env.PLUG_API_URL}apply/commands/register-fee-payment`;
    const formData = await req.formData();

    const payload = {
        applicantId: formData.get('id'),
        paymentDate: formData.get('date'),
        paidFee: {
            amount: formData.get('amount'),
            currency: formData.get('currency')
        }
    }
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    });
    return res;
}