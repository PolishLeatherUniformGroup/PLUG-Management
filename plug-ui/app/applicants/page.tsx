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
    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'status') {
            return <Chip color="primary" size="sm" variant="flat">{cellValue}</Chip>
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
                }else{
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