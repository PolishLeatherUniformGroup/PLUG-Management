'use client'
import { FeeItemDto } from "@/app/models/FeeDto";
import { Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { format, formatDate } from "date-fns";
import React from "react";

export default function MemberFees({ fees }: { fees: FeeItemDto[] }) {
    const columns = [{
        key: 'year',
        label: 'Rok'

    }, {
        key: 'requiredFee',
        label: 'Wymagana składka'
    }, {
        key: 'requiredFeeDate',
        label: 'Termin płatności'
    }, {
        key: 'paidFee',
        label: 'Opłacona składka'
    }, {
        key: 'paidFeeDate',
        label: 'Data opłacenia'
    }];
    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'requiredFeeDate' || columnKey === 'paidFeeDate') {
            return format(cellValue,"dd-MM-yyyy");
        }
        return cellValue;
    }, []);
    return (<>
        {fees.length == 0 && <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-full"
        />}
        {fees.length > 0 && <Table>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} align="start">
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent="Brak" items={fees}>
                {(item) => (<TableRow key={item.id}>
                    {(columnKey) => <TableCell>{
                        renderCell(item, columnKey)}</TableCell>}
                </TableRow>)}

            </TableBody>
        </Table>
        }
    </>
    )
}