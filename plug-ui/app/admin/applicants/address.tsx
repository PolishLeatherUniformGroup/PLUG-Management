import { Input } from "@nextui-org/react";
import { AddressDto } from "../../models/AddressDto";

export function Address({address}: {address?:AddressDto}) {
    return (<div className="grid grid-cols-4 gap-2">
    <Input label="Kraj" isReadOnly className="col-span-2" value={address?.country} />
    <Input label="Region" isReadOnly className="col-span-2" value={address?.state} />
    <Input label="Miejscowość" isReadOnly className="col-span-2" value={address?.city} />
    <Input label="Kod pocztowy" isReadOnly className="col-span-2" value={address?.postalCode} />
    <Input label="Ulica" isReadOnly className="col-span-3" value={address?.street} />
</div>);
}