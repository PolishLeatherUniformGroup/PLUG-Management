'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Table, TableBody, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default withPageAuthRequired(function Members() {
    return (
        <div className="w-full gap-2">
            <div className="bg-content1 p-2 drop-shadow-sm rounded-lg col-span-12 row-span-1 my-2 flex gap-2">
                <ButtonGroup radius="sm">
                    <Button color="default" startContent={<FontAwesomeIcon icon={faSquarePlus} />}>Dodaj</Button>
                    <Button color="default" startContent={<FontAwesomeIcon icon={faFileImport} />}>Import</Button>
                </ButtonGroup>
                <ButtonGroup radius="sm">
                    <Button color="default" startContent={<FontAwesomeIcon  icon={faEnvelope}/>}>Wiadomość</Button>
                    <Button color="default" startContent={<FontAwesomeIcon icon={faMoneyBillTransfer} />}>Składka</Button>
                </ButtonGroup>
            </div>
            <Table className="" radius="sm">
                <TableHeader>
                    <TableColumn>Numer</TableColumn>
                    <TableColumn>Imię</TableColumn>
                    <TableColumn>Nazwisko</TableColumn>
                    <TableColumn>Email</TableColumn>

                </TableHeader>
                <TableBody emptyContent="Nie ma jescze członków">{[]}</TableBody>
            </Table>
        </div>
    );
});