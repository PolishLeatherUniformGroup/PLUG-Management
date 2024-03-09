
export async function registerPayment(onSuccess: () => void, formData: FormData) {
    const id= formData.get('id');
    const payload = {
        id,
        amount: formData.get('amount'),
        currency: formData.get('currency'),
        date: formData.get('date')
    };
    fetch(`/api/members/${id}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    onSuccess();
};