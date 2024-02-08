'use client'
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";

export default function MembersMyDataRecommendations() {
    return (
        <div className="mb-5"><Table className="light" radius="sm">
            <TableHeader>
                <TableColumn>Status</TableColumn>
                <TableColumn>Imię</TableColumn>
                <TableColumn>Nazwisko</TableColumn>
                <TableColumn>Data rekomendacji</TableColumn>
                <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Brak danych"}>{[]}
            </TableBody>
        </Table></div>);
}