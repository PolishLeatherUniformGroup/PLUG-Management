'use client';
import { Key, useEffect, useState } from "react"
import { ApplicantDto } from '@/app/models/applicant.dto';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Progress, Chip, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ButtonGroup, CircularProgress } from "@nextui-org/react";
import { parseISO, format } from 'date-fns';
import ApplicationPreview from "./application-preview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faFileArrowDown, faFileInvoiceDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ApplicantDetails, Recommendation } from "../models/applicant-details.dto";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Applicants() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [applicant, setApplicant] = useState({ loading: true, data: {} as ApplicantDetails });
    const [recomendations, setRecommendations] = useState({ loading: true, data: [] as Recommendation[] });
    const handleOpen = (key: Key) => {
        loadApplicant(key);
        onOpen();
    }
    const [selectedApplicant, setSelectedApplicant] = useState("" as string);
    const columns = [{
        key: 'firstName',
        label: 'Imię'
    }, {
        key: 'lastName',
        label: 'Nazwisko'
    }, {
        key: 'email',
        label: 'Email'
    }, {
        key: 'applyDate',
        label: 'Data wniosku'
    }, {
        key: 'status',
        label: 'Status'
    }];

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

    const displayStatus = (status: number) => {
        if (status === 1) {
            return (<Chip color="primary" size="sm" variant="bordered">Otrzymany</Chip>);
        }
        if (status === 2) {
            return (<Chip color="warning" size="sm" variant="bordered">Anulowany</Chip>);
        }
        if (status === 3) {
            return (<Chip color="primary" size="sm" variant="bordered">W rekomendacji</Chip>);
        }
        if (status === 4) {
            return (<Chip color="primary" size="sm" variant="bordered">Oczekuje decyzji</Chip>);
        }
        if (status === 5) {
            return (<Chip color="success" size="sm" variant="bordered">Przyjęty</Chip>);
        }
        if (status === 6) {
            return (<Chip color="danger" size="sm" variant="bordered">Odrzucony</Chip>);
        }
        if (status === 7) {
            return (<Chip color="warning" size="sm" variant="bordered">W odwołaniu</Chip>);
        }
        if (status === 8) {
            return (<Chip color="danger" size="sm" variant="bordered">Odwołanie nieważne</Chip>);
        }
        if (status === 9) {
            return (<Chip color="success" size="sm" variant="bordered">Odwołanie uznane</Chip>);
        }
        if (status === 10) {
            return (<Chip color="danger" size="sm" variant="bordered">Odwołanie odrzucone</Chip>);
        }
        return '';
    };

    const loadApplicant = (id: Key) => {
        fetch(`/api/apply/applicants/${id}`)
            .then(response => response.json())
            .then((data) => {
                console.log("loaded: ", data);
                setApplicant({ data, loading: false });
            });
    }

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'status') {
            return displayStatus(cellValue);
        }

        else {
            return cellValue;
        }
    }, []);

    const [applicants, setApplicants] = useState({ loading: true, rows: [] as any[] })

    useEffect(() => {
        fetch('/api/apply/applicants')
            .then(response => response.json())
            .then((data: ApplicantDto[]) => {
                if (data.length > 0) {
                    const items = data.map((applicant) => {
                        return {
                            key: applicant.id,
                            firstName: applicant.firstName,
                            lastName: applicant.lastName,
                            email: applicant.email,
                            applyDate: format(applicant.applyDate, "dd-MM-yyyy"),
                            status: applicant.status
                        }
                    });
                    setApplicants({ rows: items, loading: false });
                } else {
                    setApplicants({ rows: [], loading: false });
                }
            })
    }, []);

    return (
        <div className="w-full">
            {applicants.loading && <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-full"
            />}
            <Table radius="sm" selectionMode="single" selectionBehavior="replace" onRowAction={(key) => handleOpen(key)}>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align={column.key === "actions" ? "center" : "start"}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={applicants.rows}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-2xl">
                                {!applicant.loading ? `Aplikacja z ${format(new Date(applicant.data.applyDate),"dd-MM-yyyy")}`:'Wczytuje ...'}
                                  
                            </ModalHeader>
                            
                            <ModalBody>
                                {applicant.loading && <CircularProgress aria-label="Loading..."  size="lg" className="self-center" />}
                                {!applicant.loading && (
                                <ApplicationPreview applicant={applicant.data} recommendations={recomendations.data} />
                                )}
                            </ModalBody></>
                    )}
                </ModalContent>
            </Modal>

        </div>);
})