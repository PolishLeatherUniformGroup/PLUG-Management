export async function createMember(onSuccess: () => void, formData: FormData) {
    console.log(formData);
    const payload = {
        card: formData.get('card'),
        firstName: formData.get('firstname'),
        lastName: formData.get('lastname'),
        email: formData.get('email'),
        phoneNumber: formData.get('phonenumber'),
        birthDate: formData.get('birthdate'),
        joinDate: formData.get('joindate'),
        address: {
            country: formData.get('country'),
            state: formData.get('state'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            street: formData.get('street')
        },
        initialFee: {
            dueAmount: {amount:formData.get('feeAmount'), currency: formData.get('feeCurrency')},
            paidAmount: {amount:formData.get('feeAmount'), currency: formData.get('feeCurrency')},
            paidDate: formData.get('feeDate'),
            dueDate: formData.get('feeDate'),
            year: formData.get('year')
        }
    };
    fetch('/api/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    onSuccess();
};