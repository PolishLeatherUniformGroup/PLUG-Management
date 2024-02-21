import { NextRequest } from "next/server";

export const POST = async function sendApplication(req:NextRequest){
    const endpoint = `${process.env.PLUG_API_URL}apply/commands/send-application`;
    const formData = await req.formData();
    const payload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phoneNumber: formData.get('phone'),
        birthdate: formData.get('birthdate'),
        applyDate: new Date().toISOString(),
        address:{
            country: formData.get('country'),
            state: formData.get('state'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            street: formData.get('street')
        },
        recommendersCards: [formData.get('card1'), formData.get('card2')]
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}