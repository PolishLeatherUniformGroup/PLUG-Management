import { RecommendationItemDto } from "@/app/models/recommendation-items";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";
import { approveRecommendation } from "../actions";

export default function MyRecommendations({ recommendations}:{recommendations: RecommendationItemDto[]}) {
    const columns = [{
        key: 'firstName',
        label: 'Imię'

    }, {
        key: 'lastName',
        label: 'Nazwisko'
    }, {
        key: 'applyDate',
        label: 'Data wniosku'
    }, {
        key: 'actions',
        label: 'Akcje'
    }];
    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];
        if (columnKey === 'applyDate') {
            return format(cellValue,"dd-MM-yyyy");
        }
        if (columnKey === 'actions') {
            console.log(user.recommendationId, user.applicantId);
            return <Button color="success" onPress={()=>approveRecommendation(user['applicantId'],user['recommendationId'])}>Potwierdź</Button>
        }
        return cellValue;
    }, []);
    return (
        <Table>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} align="start">
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent="Brak" items={recommendations}>
            {(item) => (<TableRow key={item.recommendationId}>
                    {(columnKey) => <TableCell>{
                        renderCell(item, columnKey)}</TableCell>}
                </TableRow>)}
            </TableBody>
        </Table>
    )
}