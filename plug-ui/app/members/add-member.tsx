'use client';

import { Button, Divider, Input } from "@nextui-org/react";
import {createMember} from "./actions";


export default function AddMember({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
    const createMemberAction = createMember.bind(null, onSuccess);
    return (
        <form className="w-full grid grid-cols-4 gap-2" action={createMemberAction}>
            <Input label="Numer Karty" name="card" className="col-span-2" />
            <Input label="Imię"  name="firstname" className="col-span-2 col-start-1" />
            <Input label="Nazwisko" name="lastname" className="col-span-2" />
            <Input label="Email" name="email"  className="col-span-2" />
            <Input label="Telefon" name="phonenumber" className="col-span-2" />
            <Input label="Data urodzenia" name="birthdate" labelPlacement="outside-left" type="date" required size="lg" className="col-span-2" />
            <Input label="Data dołączenia" name="joindate" labelPlacement="outside-left" type="date" required size="lg" className="col-span-2" />
            <h3 className="col-span-4 text-xl font-bold">Adres korespondencyjny</h3>
            <Input label="Kraj" name="country" required size="lg" className="col-span-2" />
            <Input label="Region" name="state" size="lg" className="col-span-2" />
            <Input label="Miejscowość" name="city" required size="lg" className="col-span-2" />
            <Input label="Kod pocztowy" name="postalCode" required size="lg" className="col-span-2" />
            <Input label="Ulica" name="street" required size="lg" className="col-span-3" />
            <Divider className="col-span-4" />
            <div className="col-start-4">
                <Button color="danger" variant="light" onPress={onCancel} className="mx-2" size="md" >
                    Anuluj
                </Button>
                <Button color="primary" onPress={onSuccess} className="mx-2" size="md" type="submit">
                    Zapisz
                </Button>
            </div>
        </form >
    );
}