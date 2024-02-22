'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, CircularProgress, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import AddMember from "./add-member";
import DragAndDrop from "./drag-and-drop";

export default withPageAuthRequired(function Members() {
    const { isOpen: isAddMemberOpen, onOpen: onAddMemberOpen, onClose: onAddMemberClose } = useDisclosure();
    const { isOpen: isImportMembersOpen, onOpen: onImportMembersOpen, onClose: onImportMembersClose } = useDisclosure();
    return (
        <div className="w-full gap-2">
            <div className="bg-content1 p-2 drop-shadow-sm rounded-lg col-span-12 row-span-1 my-2 flex gap-2">
                <ButtonGroup radius="sm">
                    <Button color="default" startContent={<FontAwesomeIcon icon={faSquarePlus} />} onPress={()=>{onAddMemberOpen()}}>Dodaj</Button>
                    <Button color="default" startContent={<FontAwesomeIcon icon={faFileImport} />} onPress={()=>{onImportMembersOpen()}}>Import</Button>
                </ButtonGroup>
                <ButtonGroup radius="sm">
                    <Button color="default" startContent={<FontAwesomeIcon icon={faEnvelope} />}>Wiadomość</Button>
                    <Button color="default" startContent={<FontAwesomeIcon icon={faMoneyBillTransfer} />}>Składka</Button>
                </ButtonGroup>
            </div>
            <Table className="" radius="sm">
                <TableHeader>
                    <TableColumn>Numer</TableColumn>
                    <TableColumn>Imię</TableColumn>
                    <TableColumn>Nazwisko</TableColumn>
                    <TableColumn>Email</TableColumn>

                </TableHeader>
                <TableBody emptyContent="Nie ma jeszcze członków">{[]}</TableBody>
            </Table>
            <Modal backdrop="blur" isOpen={isAddMemberOpen} onClose={onAddMemberClose} size="4xl" scrollBehavior="inside" isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-3xl font-bold">Dodawanie Członka</ModalHeader>
                            <ModalBody>
                                <AddMember onSuccess={onClose} onCancel={onClose}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal backdrop="blur" isOpen={isImportMembersOpen} onClose={onImportMembersClose} size="4xl" scrollBehavior="inside" isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-3xl font-bold">Import członków</ModalHeader>
                            <ModalBody>
                                <DragAndDrop onSuccess={onClose} onCancel={onClose}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
});