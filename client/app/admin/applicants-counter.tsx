import { Avatar, Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faRegistered } from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function ApplicantsCounter() {
    return (
        <Card radius="none">
            <CardHeader>

                <FontAwesomeIcon icon={faUserPlus} className="text-default-500 p-3 fa-2x bg-default-300 rounded-md drop-shadow-md" />
                <h3 className="text-3xl px-2 text-default-500">Aplikacje</h3>
            </CardHeader>
            <CardBody>
                <div className=" gap-1">
                    <Chip color="success" radius="sm" size="lg" variant="solid" className="m-1" avatar={
                        <Avatar name="0" />
                    }>
                        Nowe
                    </Chip>
                    <Chip color="primary" radius="sm" size="lg" variant="solid" className="m-1"avatar={
                        <Avatar name="0" />
                    }>
                        W rekomendacji
                    </Chip>
                    <Chip color="warning" radius="sm" size="lg" variant="solid"className="m-1" avatar={
                        <Avatar name="0" />
                    }>
                        Bez decyzji
                    </Chip>
                    <Chip color="danger" radius="sm" size="lg" variant="solid"className="m-1"avatar={
                        <Avatar name="0" />
                    }>
                        Odrzucone
                    </Chip>

                </div>
            </CardBody>
        </Card>
    );
}