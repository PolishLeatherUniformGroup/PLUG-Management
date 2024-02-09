'use client'
import { Button, ButtonGroup, Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHourglass, faXmark, faCheck, faPaperPlane, faLayerGroup, faFileInvoiceDollar, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import ApplicationPreview from "./application-preview";
import { Applicant } from "@/app/models/apply/application.model";


export default function AdminApplicants() {
    return <div className="grid grid-cols-12 gap-2 auto-rows-min">
        <div className="col-span-7">
            <div className="bg-content1 p-4 drop-shadow-sm rounded-lg mb-2">
                <FontAwesomeIcon icon={faFilter} className="text-default-600 fa-1x" />
                <span className="text-default-600 font-bold">Filtry</span>
                <ButtonGroup className="mx-2">
                    <Button><FontAwesomeIcon icon={faLayerGroup} />Wszystkie</Button>
                    <Button><FontAwesomeIcon icon={faPaperPlane} />Nowe</Button>
                    <Button><FontAwesomeIcon icon={faHourglass} />W trakcie</Button>
                    <Button><FontAwesomeIcon icon={faCheck} />Zakceptowane</Button>
                    <Button><FontAwesomeIcon icon={faXmark} />Odrzucone</Button>
                </ButtonGroup>
            </div><Table radius="sm">
                <TableHeader>
                    <TableColumn>Imię</TableColumn>
                    <TableColumn>Nazwisko</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Data wniosku</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Brak aplikacji"}>{[]}</TableBody>
            </Table>
        </div>
        <div className="col-span-5 row-span-2 ">
            <ApplicationPreview applicant={{} as Applicant} />
        </div>



    </div>
}