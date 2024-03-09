import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { ApplicantDto } from '../../../models/applicant.dto';

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
       
        const mapppedApplicants = applicants.data.map((a:any) => {
            return {
                id: a.applicantId,
                firstName: a.firstName,
                lastName: a.lastName,
                email: a.email,
                applyDate: a.applyDate,
                status: a.status
            }as ApplicantDto
        });
        return Response.json(mapppedApplicants);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error }, { status: 500 });
    }
});