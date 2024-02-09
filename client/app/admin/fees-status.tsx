import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar,faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function FeesStatus() {
    return (
        <Card radius="none">
            <CardHeader>

                <FontAwesomeIcon icon={faSackDollar} className="text-default-500 p-3 fa-2x bg-default-300 rounded-md drop-shadow-md" />
                <h3 className="text-3xl px-2 text-default-500">Składki</h3>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-4 bg-default-300 rounded-lg m-1 p-2">
                    <Chip color="success" radius="sm" size="lg" variant="solid" className="m-1">
                        <FontAwesomeIcon icon={faCheck} className="fa-1x" />
                    </Chip>
                    <h4 className="text-default-700 text-3xl font-thin text-center">40</h4>
                </div>
                <div className="grid grid-cols-4 bg-default-300 rounded-lg m-1 p-2">
                    <Chip color="danger" radius="sm" size="lg" variant="solid" className="m-1">
                        <FontAwesomeIcon icon={faXmark} className="fa-1x" />
                    </Chip>
                    <h4 className="text-default-700 text-3xl font-thin text-center">0</h4>
                </div>
            </CardBody>
        </Card>
    );
}