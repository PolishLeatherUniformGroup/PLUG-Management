'use client';
import { Divider, Input, Spinner } from "@nextui-org/react";


import { useUser } from '@auth0/nextjs-auth0/client';

export default function MemberDetail() {
    const { user, error, isLoading } = useUser();

    return isLoading ? (<div>
    <Spinner size="lg" color="primary" className="mx-auto"/>
    </div>): (
        <div className="border-1 border-slate-100 rounded-sm drop-shadow-md  w-full bg-slate-50 m-4 mx-auto p-6">
            <div className="grid grid-cols-3 gap-5">
                <div className="">
                    PHOTO
                </div>
                <div className="">
                    <Input type="text" variant="underlined" label="Numer Legitymacji" isDisabled value={user?.nickname ?? ""} className="light" />
                    <Input type="text" variant="underlined" label="Imię" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Adres E-mail" isDisabled value={user?.email ?? ""} className="light" />
                    <h5 className="mt-2">Adres</h5>
                    <Input type="text" variant="underlined" label="Kraj" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Miasto" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Ulica" isDisabled value="" className="light" />
                </div>
                <div className="">
                    <Input type="text" variant="underlined" label="Członek od" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Nazwisko" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Numer telefonu" isDisabled value="" className="light" />
                    <h5 className="mt-2">&nbsp;</h5>
                    <Input type="text" variant="underlined" label="Region" isDisabled value="" className="light" />
                    <Input type="text" variant="underlined" label="Kod pocztowy" isDisabled value="" className="light" />

                </div>
            </div>

            <div className="w-1/2 mx-auto mt-4">
                <button className="bg-primary text-foreground rounded-md p-2 m-2">Modyfikuj</button>
            </div>
        </div>
    );
};