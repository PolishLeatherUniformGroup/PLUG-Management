'use client'
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";

export default function MembersMyDataFees(){
    return (
        <div className="mb-5"><Table radius="sm">
            <TableHeader>
                <TableColumn>Okres</TableColumn>
                <TableColumn>Kwota</TableColumn>
                <TableColumn>Termin płatności</TableColumn>
                <TableColumn>Data płatności</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Brak danych"}>{[]}
            </TableBody>
        </Table></div>);
}