'use client'
import { Button, ButtonGroup, Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus,faFileCsv,faMoneyBillTransfer,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { MemberView } from "./member-view";

export default function AdminMembers() {
    return (
        <div className="grid grid-cols-12 gap-2 auto-rows-min">
            <div className="col-span-12 bg-content1 p-4 drop-shadow-sm rounded-xl">
                <div className="flex gap-2">
                    <ButtonGroup>
                        <Button>
                            <FontAwesomeIcon icon={faSquarePlus} className="fa-1x"/> Dodaj
                        </Button>
                        <Button>
                        <FontAwesomeIcon icon={faFileCsv} className="fa-1x"/> Importuj
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button>
                        <FontAwesomeIcon icon={faMoneyBillTransfer} />Składka roczna
                        </Button>
                        <Button>
                        <FontAwesomeIcon icon={faEnvelope} />Wyślij wiadomość
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="col-span-7">
                <Table>
                    <TableHeader>
                        <TableColumn>Nr Karty</TableColumn>
                        <TableColumn>Imię</TableColumn>
                        <TableColumn>Nazwisko</TableColumn>
                        <TableColumn>Członek od</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"Brak członków"}>{[]}
                    </TableBody>
                </Table>
            </div>
            <div className="col-span-5">
                <MemberView />
            </div>
        </div>);
};