'use client';
import { Button, Input } from "@nextui-org/react";
import { registerPayment } from "./actions";
import { ApplicantDetails } from "../../../models/applicant-details.dto";

export default function RegisterPayment({ applicant, onSuccess, onCancel }: { applicant: ApplicantDetails, onSuccess: () => void, onCancel: () => void }) {
    const registerPaymentAction = registerPayment.bind(null, onSuccess);
    return (
        <form className="w-full grid grid-cols-4 gap-2" action={registerPaymentAction}>
            <div className="grid grid-cols-12 gap-2">
                <input type="hidden" name="id" value={applicant.id} />
                <Input label="Kwota" className="col-span-4" name="amount"/>
                <Input label="Waluta" value={applicant.fee.currency} name="currency" className="col-span-4" />
                <Input label="Data płatności" type="date"  name="date" value={new Date(Date.now()).toISOString()} className="col-span-4" />
                <div className="col-span-6 col-start-4">
                    <Button color="success" className="mx-2" onPress={onSuccess}>Zarejestruj</Button>
                    <Button color="default" onClick={onCancel}>Anuluj</Button>
                </div>
            </div>
        </form>);
}