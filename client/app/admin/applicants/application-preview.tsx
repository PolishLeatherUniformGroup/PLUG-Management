import { Applicant } from "@/app/models/apply/application.model";
import { faCheck, faFileArrowDown, faFileInvoiceDollar, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Chip, Input, Accordion, AccordionItem, TableHeader, TableColumn, TableBody, Table } from "@nextui-org/react";

export default function ApplicationPreview({applicant}:{applicant: Applicant}) {

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


    return (<div className="bg-content1 p-4 mb-2 drop-shadow-sm rounded-lg gap-1">
        <div className="grid grid-cols-4 gap-2 py-2">
            <h3 className="text-2xl mb-2 col-span-3">{`Wniosek z dnia: ${applicant.applicationDate}`}</h3>
            <Chip color="primary" size="lg" variant="bordered" radius="sm">W rekomendacji</Chip>
            <div className="bg-content2 py-2 rounded-2xl mb-1 col-span-4">
                {beforeDecisionActions()}
            </div>

            <h4 className="text-lg col-span-4">Szczegóły Wniosku</h4>
            <Input label="Imię" isReadOnly className="col-span-2" value={applicant.firstName} />
            <Input label="Nazwisko" isReadOnly className="col-span-2" value={applicant.lastName} />
            <Input label="Email" isReadOnly className="col-span-2" value={applicant.email}/>
            <Input label="Telefon" isReadOnly className="col-span-2" value={applicant.phone} />
            <Input label="Data urodzenia" isReadOnly type="date" className="col-span-2" />
            <div className="col-span-4">
                <Accordion >
                    <AccordionItem title="Adres" key="address">
                        <div className="grid grid-cols-4 gap-2">
                            <Input label="Kraj" isReadOnly className="col-span-2" value={applicant.address?.country} />
                            <Input label="Region" isReadOnly className="col-span-2" value={applicant.address?.state} />
                            <Input label="Miejscowość" isReadOnly className="col-span-2" value={applicant.address?.city} />
                            <Input label="Kod pocztowy" isReadOnly className="col-span-2" value={applicant.address?.postalCode} />
                            <Input label="Ulica" isReadOnly className="col-span-3" value={applicant.address?.street} />
                        </div>
                    </AccordionItem>
                    <AccordionItem title="Rekomendacje">
                        <div className="grid grid-cols-4 gap-2">
                            <Input label="Rekomendacja 1" isReadOnly className="col-span-3" value={applicant.recommendation1} />
                            <Button color="default" isIconOnly variant="bordered" isDisabled size="lg" className="my-auto">
                                <FontAwesomeIcon icon={faQuestion} />
                            </Button>
                            <Input label="Rekomedacja 2" isReadOnly className="col-span-3" value={applicant.recommendation2}/>
                            <Button color="success" isIconOnly variant="bordered" isDisabled size="lg" className="my-auto">
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                        </div>
                    </AccordionItem>
                    <AccordionItem title="Składka">
                        <div className="grid grid-cols-4 gap-2">
                            <Input label="Do zapłaty"  type="number" isReadOnly value={`${applicant.requiredFee}`} />
                            <span className="my-auto">{applicant.feeCurrency}</span>
                            <Input label="Opłacone" isReadOnly  value={`${applicant.paidFee}`}/>
                            <span className="my-auto">{applicant.feeCurrency}</span>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
            <h4 className="text-lg col-span-4">Historia wniosku</h4>
            <Table radius="sm" className="col-span-4">
                <TableHeader>
                    <TableColumn>Data</TableColumn>
                    <TableColumn>Akcja</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Brak historii"}>{[]}</TableBody>
            </Table>
        </div>
        
    </div>)
}