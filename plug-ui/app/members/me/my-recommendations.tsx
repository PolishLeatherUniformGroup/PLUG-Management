import { RecommendationItemDto } from "@/app/models/recommendation-items";
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";
import { approveRecommendation, refuseRecommendation } from "../../admin/members/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleQuestion, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function MyRecommendations({ recommendations }: { recommendations: RecommendationItemDto[] }) {
    const columns = [{
        key: 'status',
        label: 'Status'
    }, {
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
            return format(cellValue, "dd-MM-yyyy");
        }
        if (columnKey === 'status') {
            if (user['status'] === null) {
                return <FontAwesomeIcon icon={faCircleQuestion} className="fa-xl text-2xl text-default/50" />
            }
            if (user['status']) {
                return <FontAwesomeIcon icon={faCircleCheck} color="fa-xl text-2xl text-success" />
            }
            return <FontAwesomeIcon icon={faCircleXmark} color="fa-xl text-2xl text-danger" />
        }
        if (columnKey === 'actions') {
            if (user['status'] === null) {
                return <div className="flex gap-2">
                    <Button color="success" onPress={() => approveRecommendation(user['applicantId'], user['recommendationId'])}>Potwierdź</Button>
                    <Button color="danger" onPress={() => refuseRecommendation(user['applicantId'], user['recommendationId'])}>Wycofaj</Button>
                </div>
            }else{
                return <Chip size="md" radius="sm">Nie można już wykonać</Chip>
            }
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