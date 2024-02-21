import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function getApplications(req) {
    try {
        const res = new NextResponse();
        const {accessToken} = await getAccessToken(req, res);
        const endpoint = `${process.env.PLUG_API_URL}apply/applicants`;
        const response = await fetch(endpoint, {
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`
            },
            method: 'GET'
        });
        const applicants = await response.json();
        return Response.json(applicants.data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error }, { status: 500 });
    }
});