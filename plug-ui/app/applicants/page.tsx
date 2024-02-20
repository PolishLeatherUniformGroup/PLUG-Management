'use client';
import { useEffect, useState } from "react"
import { ApplicantDto } from '@/app/models/applicant.dto';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Progress, Chip } from "@nextui-org/react";
import { parseISO, format } from 'date-fns';
import ApplicationPreview from "./application-preview";
import React from "react";

export default function Applicants() {
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

    }, {
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
        return '';
    };
    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'status') {
            return displayStatus(cellValue);
        } else {
            return cellValue;
        }
    }, []);
    const [applicants, setApplicants] = useState({ loading: true, rows: [] as any[] })
    let selectedApplicant: string | undefined | null = null;
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
        <div className="w-full grid grid-cols-12 p-2 gap-2 auto-rows-min">
            <div className="col-span-7">
                <div className="bg-content1 p-4 drop-shadow-sm rounded-lg mb-2">

                </div>
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
            </div>
            <div className="col-span-5 row-span-2 ">
                {selectedApplicant}
                {selectedApplicant !== null && <ApplicationPreview applicantId={selectedApplicant} />}
            </div>
        </div>);
}