import { ApplicantDetails } from "@/app/models/applicant-details.dto";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function getApplications(
    request: NextRequest,
    {params: {applicantId}}: {params: {applicantId: string}}
  ) {
    
    try {
        const res = new NextResponse();
        const {accessToken} = await getAccessToken(request, res);
        const endpoint = `${process.env.PLUG_API_URL}apply/applicants/${applicantId}`;
        const response = await fetch(endpoint, {
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`
            },
            method: 'GET'
        });
        const applicant:ApplicantDetails = await response.json();
        return Response.json(applicant);
    } catch (error) {
        return Response.json({ error: error }, { status: 500 });
    }
  };