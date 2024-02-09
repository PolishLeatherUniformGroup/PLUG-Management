import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function EventsInsight() {
    return (
        <Card radius="none">
            <CardHeader>
   
                    <FontAwesomeIcon icon={faCalendar} className="text-default-500 p-3 fa-2x bg-default-300 rounded-md drop-shadow-md" />
            <h3 className="text-3xl px-2 text-default-500">Wydarzenia</h3>
            </CardHeader>
            <CardBody>
              
            </CardBody>
        </Card>
    );
}