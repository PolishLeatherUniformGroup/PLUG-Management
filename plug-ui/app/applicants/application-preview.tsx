
import { faCheck, faFileArrowDown, faFileInvoiceDollar, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Chip, Input, Accordion, AccordionItem, TableHeader, TableColumn, TableBody, Table } from "@nextui-org/react";
import { ApplicantDetails } from "../models/applicant-details.dto";
import { Recommendation } from "../models/Recommendation";
import { useEffect, useState } from "react";
import { Address } from "./address";
import { Fee } from "./fee";
import { format } from "date-fns";

export default function ApplicationPreview({ applicant, recommendations }: { applicant?: ApplicantDetails | null, recommendations: Recommendation[] }) {

    const chooseActions = (status?: number) => {
        if (status === 1 || status === 3) {
            return beforeDecisionActions();
        }
        if (status === 4) {
            return readyForDecisionActions();
        }
        if (status === 6) {
            return afterDecisionActions();
        }
        if (status === 7) {
            return afterAppealActions();
        }
    }
    const readyForDecisionActions = () => (
        <ButtonGroup className="mx-2">
            <Button color="success"><FontAwesomeIcon icon={faCheck} />Akcetuj</Button>
            <Button color="warning"><FontAwesomeIcon icon={faXmark} />Odrzuć</Button>
        </ButtonGroup>
    );
    const beforeDecisionActions = () => (
        <ButtonGroup className="mx-2">
            <Button color="default"><FontAwesomeIcon icon={faFileInvoiceDollar} />Rejestruj płatność</Button>
        </ButtonGroup>
    )
    const afterDecisionActions = () => (
        <ButtonGroup className="mx-2">
            <Button color="default"><FontAwesomeIcon icon={faFileArrowDown} />Przyjmij odwołanie</Button>
        </ButtonGroup>
    )
    const afterAppealActions = () => (
        <ButtonGroup className="mx-2">
            <Button color="success"><FontAwesomeIcon icon={faCheck} />Akcetuj odwołanie</Button>
            <Button color="danger"><FontAwesomeIcon icon={faXmark} />Odrzuć odwołanie</Button>
        </ButtonGroup>
    );

    const displayStatus = (status?: number) => {
        if (status === 1) {
            return (<Chip color="primary" size="lg" variant="bordered" className="col-span-3">Otrzymany</Chip>);
        }
        if (status === 2) {
            return (<Chip color="warning" size="lg" variant="bordered" className="col-span-3">Anulowany</Chip>);
        }
        if (status === 3) {
            return (<Chip color="primary" size="lg" variant="bordered" className="col-span-3">W rekomendacji</Chip>);
        }
        if (status === 4) {
            return (<Chip color="primary" size="lg" variant="bordered" className="col-span-3">Oczekuje decyzji</Chip>);
        }
        if (status === 5) {
            return (<Chip color="success" size="lg" variant="bordered" className="col-span-3">Przyjęty</Chip>);
        }
        if (status === 6) {
            return (<Chip color="danger" size="lg" variant="bordered" className="col-span-3">Odrzucony</Chip>);
        }
        if (status === 7) {
            return (<Chip color="warning" size="lg" variant="bordered" className="col-span-3">W odwołaniu</Chip>);
        }
        if (status === 8) {
            return (<Chip color="danger" size="lg" variant="bordered" className="col-span-3">Odwołanie nieważne</Chip>);
        }
        if (status === 9) {
            return (<Chip color="success" size="lg" variant="bordered">Odwołanie uznane</Chip>);
        }
        if (status === 10) {
            return (<Chip color="danger" size="lg" variant="bordered">Odwołanie odrzucone</Chip>);
        }
        return '';
    };

    return (<div className="bg-content1 p-4 mb-2 drop-shadow-sm rounded-lg gap-1">
        <div className="grid grid-cols-12 gap-2 py-2">
            <h3 className="text-2xl mb-2 col-span-3">Status wniosku</h3>
            {displayStatus(applicant?.status)}
            <div className="bg-content2 py-2 rounded-2xl mb-1 col-span-12">
                {chooseActions(applicant?.status)}
            </div>

            <h4 className="text-lg col-span-12">Szczegóły Wniosku</h4>
            <Input label="Imię" isReadOnly className="col-span-6" value={applicant?.firstName} />
            <Input label="Nazwisko" isReadOnly className="col-span-6" value={applicant?.lastName} />
            <Input label="Email" isReadOnly className="col-span-6" value={applicant?.email} />
            <Input label="Telefon" isReadOnly className="col-span-6" value={applicant?.phoneNumber} />
            <Input label="Data urodzenia" isReadOnly className="col-span-6" value={applicant != undefined ? format(applicant.birthDate,"dd-MM-yyyy") : ""} />
            <div className="col-span-12">
                <Accordion >
                    <AccordionItem title="Adres" key="address">
                        <Address address={applicant?.address} />
                    </AccordionItem>
                    <AccordionItem title="Rekomendacje">
                        <div className="grid grid-cols-4 gap-2">
                            {applicant?.recommendations.map((recomendation, index) => {
                                return (<>
                                    <Input label={`Rekomendacja ${index + 1}`} isReadOnly className="col-span-3" value={recomendation.cardNumber} />
                                    {recomendation.status === true&&(<Button color="success" isIconOnly variant="bordered" isDisabled size="lg" className="my-auto">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </Button>)}
                                    {recomendation.status === false&&(<Button color="danger" isIconOnly variant="bordered" isDisabled size="lg" className="my-auto">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>)}
                                    {recomendation.status === undefined&&(<Button color="danger" isIconOnly variant="bordered" isDisabled size="lg" className="my-auto">
                                        <FontAwesomeIcon icon={faQuestion} />
                                    </Button>)}
                                </>)
                            })}


                        </div>
                    </AccordionItem>
                    <AccordionItem title="Składka">
                        <Fee fee={applicant?.fee} />
                    </AccordionItem>
                    <AccordionItem title="Historia wniosku">
                        < Table radius="sm" className="col-span-12">
                            <TableHeader>
                                <TableColumn>Data</TableColumn>
                                <TableColumn>Akcja</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"Brak historii"}>{[]}</TableBody>
                        </Table>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>

    </div>)
}