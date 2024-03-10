import { FeeItemDto } from "@/app/models/FeeDto";
import { ApplicantDetails } from "@/app/models/applicant-details.dto";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { ApplicationFeeDto } from "../../../../models/application-fee.dto";

export const GET = async function getApplication(
    request: NextRequest,
    { params: { applicantId } }: { params: { applicantId: string } }
) {

    try {
        const res = new NextResponse();
        const { accessToken } = await getAccessToken(request, res);
        const endpoint = `${process.env.PLUG_API_URL}apply/applicants/${applicantId}`;
        const response = await fetch(endpoint, {
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`
            },
            method: 'GET'
        });
        const applicantData = await response.json();
        const recommendationRequests = await fetch(`${process.env.PLUG_API_URL}apply/applicants/${applicantId}/recommendations`, {
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`
            },
            method: 'GET'
        });
        const applicant: ApplicantDetails = {
            id: applicantData.id,
            firstName: applicantData.firstName,
            lastName: applicantData.lastName,
            email: applicantData.email,
            phoneNumber: applicantData.phoneNumber,
            status: applicantData.status,
            applyDate: applicantData.applyDate,
            birthDate: applicantData.birthDate,
            address: {
                street: applicantData.address.street,
                city: applicantData.address.city,
                postalCode: applicantData.address.postalCode,
                country: applicantData.address.country,
                state: applicantData.address.state
            },
            recommendations: (await recommendationRequests.json()).data,
            fee: {
                requiredFee: applicantData.requiredFeeAmount,
                paidFee: applicantData.paidFeeAmount,
                currency: applicantData.feeCurrency
            } as ApplicationFeeDto
        }
        return Response.json(applicant);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error }, { status: 500 });
    }
};
