import { MemberDto } from "@/app/models/member.dto";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import { format } from "date-fns";
import { useState } from "react";

export default function MyData({ member }: { member: MemberDto }) {
    const [isEditable, setIsEditable] = useState(false);
    console.log(new Date(member.birthDate), new Date(member.joinedDate));
    return (<Card className="col-span-12">
        <CardHeader>
            <h1 className="text-2xl font-bold text-left">Twoje dane</h1>

        </CardHeader>
        <CardBody>
            <form className="grid grid-cols-12 gap-4">
                <Input className="col-span-4" isReadOnly value={member.card} label="Numer karty" />
                <Input className="col-span-4" isReadOnly={!isEditable} value={member.firstName} label="Imię" />
                <Input className="col-span-4" isReadOnly={!isEditable} value={member.lastName} label="Nazwisko" />
                <Input className="col-span-4" isReadOnly={!isEditable} value={member.email} label="Email" />
                <Input className="col-span-4" isReadOnly={!isEditable} value={member.phoneNumber} label="Telefon" />
                {isEditable ?
                    <Input className="col-span-4" type="date" itemType="Date" value={format(new Date(member.birthDate),"dd.MM.yyyy" )} label="Data urodzenia" />
                    : <Input className="col-span-4" isReadOnly={!isEditable} value={format(new Date(member.birthDate),"dd.MM.yyyy")} label="Data urodzenia" />}
                <Input className="col-span-4" isReadOnly={true} value={format(new Date(member.joinedDate),"dd.MM.yyyy")} label="Członkostwo od" />
                <h2 className="col-span-12 text-lg font-bold">Adres</h2>
                <Input className="col-span-3" isReadOnly={!isEditable} value={member.address.country} label="Kraj" />
                <Input className="col-span-3" isReadOnly={!isEditable} value={member.address.state} label="Region" />
                <Input className="col-span-3" isReadOnly={!isEditable} value={member.address.city} label="Miasto" />
                <Input className="col-span-3" isReadOnly={!isEditable} value={member.address.postalCode} label="Kod pocztowy" />
                <Input className="col-span-6" isReadOnly={!isEditable} value={member.address.street} label="Ulica" />
                <div className="col-span-12">

                    {isEditable ?
                        (<>
                            <Button className="m-2" color="primary">Zapisz</Button>
                            <Button className="m-2" color="danger" onClick={() => setIsEditable(false)}>Anuluj</Button>
                        </>
                        )
                        :
                        <Button className="m-2" color="primary" onClick={() => setIsEditable(true)}>Edytuj</Button>}
                </div>
            </form>
        </CardBody>
    </Card>)
}