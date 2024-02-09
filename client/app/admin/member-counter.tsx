import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function MembersCounter() {
    return (
        <Card radius="none">
            <CardHeader>
   
                    <FontAwesomeIcon icon={faUsers} className="text-default-500 p-3 fa-2x bg-default-300 rounded-md drop-shadow-md" />
            <h3 className="text-3xl px-2 text-default-500">Członkowie</h3>
            </CardHeader>
            <CardBody>
                <h4 className="text-neutral-400 text-9xl font-thin text-center">40</h4>
            </CardBody>
        </Card>
    );
}