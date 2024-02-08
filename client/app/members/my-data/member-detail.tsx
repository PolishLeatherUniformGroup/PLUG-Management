'use client';
import { Button, Divider, Input, Spinner } from "@nextui-org/react";


import { useUser } from '@auth0/nextjs-auth0/client';

export default function MemberDetail() {
    const { user, error, isLoading } = useUser();

    return isLoading ? (<div>
    <Spinner size="lg" color="primary" className="mx-auto"/>
    </div>): (
        <div className="border-default rounded-md drop-shadow-md  w-full bg-content1 m-4 mx-auto p-6">
            <div className="grid grid-cols-3 gap-5">
                <div className="">
                    PHOTO
                </div>
                <div className="">
                    <Input type="text" variant="underlined" label="Numer Legitymacji" isDisabled value={user?.nickname ?? ""}  />
                    <Input type="text" variant="underlined" label="Imię" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Adres E-mail" isDisabled value={user?.email ?? ""}  />
                    <h5 className="mt-2">Adres</h5>
                    <Input type="text" variant="underlined" label="Kraj" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Miasto" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Ulica" isDisabled value=""  />
                </div>
                <div className="">
                    <Input type="text" variant="underlined" label="Członek od" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Nazwisko" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Numer telefonu" isDisabled value=""  />
                    <h5 className="mt-2">&nbsp;</h5>
                    <Input type="text" variant="underlined" label="Region" isDisabled value=""  />
                    <Input type="text" variant="underlined" label="Kod pocztowy" isDisabled value=""  />

                </div>
            </div>

            <div className="w-1/2 mx-auto mt-4">
                <Button color="primary" size="md">Modyfikuj</Button>
            </div>
        </div>
    );
};