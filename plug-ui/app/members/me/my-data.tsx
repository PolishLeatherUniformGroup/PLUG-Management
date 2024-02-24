import { Card, CardHeader, CardBody, Button, Input  } from "@nextui-org/react";
import { useState } from "react";

export default function MyData() {
    const [isEditable, setIsEditable] = useState(false);
    return(<Card className="col-span-12">
    <CardHeader>
        <h1 className="text-2xl font-bold text-left">Twoje dane</h1>
    </CardHeader>
    <CardBody>
        <form className="grid grid-cols-12 gap-4">
            <Input className="col-span-4" isReadOnly label="Numer karty" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Imię" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Nazwisko" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Email" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Telefon" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Data urodzenia" />
            <Input className="col-span-4" isReadOnly={!isEditable} label="Członkostwo od" />
            <h2 className="col-span-12 text-lg font-semibold">Adres</h2>
            <Input className="col-span-3" isReadOnly={!isEditable} label="Kraj" />
            <Input className="col-span-3" isReadOnly={!isEditable} label="Region" />
            <Input className="col-span-3" isReadOnly={!isEditable} label="Miasto" />
            <Input className="col-span-3" isReadOnly={!isEditable} label="Kod pocztowy" />
            <Input className="col-span-6" isReadOnly={!isEditable} label="Ulica" />
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