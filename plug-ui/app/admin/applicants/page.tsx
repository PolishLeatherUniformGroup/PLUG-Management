'use client';
import { Key, useEffect, useState } from "react"
import { ApplicantDto } from '@/app/models/applicant.dto';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Progress, Chip, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ButtonGroup, CircularProgress, Link } from "@nextui-org/react";
import { parseISO, format } from 'date-fns';
import ApplicationPreview from "./[applicantId]/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faFileArrowDown, faFileInvoiceDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ApplicantDetails } from "../../models/applicant-details.dto";
import { Recommendation } from "../../models/Recommendation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Applicants() {

    const columns = [{
        key:'id',
        label:'ID'
    },{
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
    },{
        key: 'actions',
        label: 'Akcje'
    
    }];


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


    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'status') {
            return displayStatus(cellValue);
        }
        if(columnKey ==='id'){
            return cellValue === null || cellValue === undefined ? '' : (cellValue as string).replaceAll('-', '');
        }
        if(columnKey === 'actions'){
            return <Button color="default" size="sm" as={Link} href={`/admin/applicants/${user['id']}`}
            startContent={<FontAwesomeIcon icon={faEye} className="fa-xl" />}>Zobacz</Button>
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
                            id: applicant.id,
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
            <Table radius="sm" selectionMode="single">
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
        </div>);
})