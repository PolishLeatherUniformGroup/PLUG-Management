'use client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, CircularProgress, Divider, Kbd, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import { useHotkeys } from "react-hotkeys-hook";
import AddMember from "./add-member";
import DragAndDrop from "./drag-and-drop";

export default withPageAuthRequired(function Members() {
    const { isOpen: isAddMemberOpen, onOpen: onAddMemberOpen, onClose: onAddMemberClose } = useDisclosure();
    const { isOpen: isImportMembersOpen, onOpen: onImportMembersOpen, onClose: onImportMembersClose } = useDisclosure();
    useHotkeys("ctrl+a", () => onAddMemberOpen(), { preventDefault: true });
    useHotkeys("ctrl+i", () => onImportMembersOpen(), { preventDefault: true });
    return (
        <div className="w-full gap-2">
            <div className="bg-content1 p-2 drop-shadow-sm rounded-lg col-span-12 row-span-1 my-2 flex gap-2">
                <ButtonGroup radius="sm" size="lg">
                    <Tooltip content={
                        
                        <div className="px-1 py-2 min-w-24 max-w-48">
                                        <div className="font-bold flex py-1">                              
                                                <span className="text-lg flex-1">Dodaj członka  </span>                
                                                <Kbd keys={["command"]} className="flex-none text-lg bg-primary-200 text-primary-800 ">A</Kbd>                                         

                                        </div>
                                        <Divider />
                                        <div className="text-small">Ręczne dodawania członka z pominięciem procesu wnioskowania</div>
                                    </div>
                    } placement="bottom" className="p-2">
                        <Button color="default" size="lg" startContent={<FontAwesomeIcon icon={faSquarePlus} />} onPress={() => { onAddMemberOpen() }}>Dodaj</Button>
                    </Tooltip>
                    <Tooltip content={<div className="px-1 py-1 min-w-24 max-w-48">
                                        <div className="font-bold flex py-1">                              
                                                <span className="text-lg flex-1">Import członków </span>                
                                                <Kbd keys={["command"]} className="flex-none text-lg bg-primary-200 text-primary-800">I</Kbd>                                         

                                        </div>
                                        <Divider />
                                        <div className="text-small">Importowanie członków z pliku CSV</div>
                                    </div>
                    } placement="bottom" className="p-2">
                        <Button color="default" size="lg" startContent={<FontAwesomeIcon icon={faFileImport} />} onPress={() => { onImportMembersOpen() }}>Import</Button>
                    </Tooltip>
                </ButtonGroup>
                <ButtonGroup radius="sm" size="lg">
                    <Tooltip content={
                        
                        <div className="px-1 py-2 min-w-24 max-w-48">
                                        <div className="font-bold flex py-1">                              
                                                <span className="text-lg flex-1">Wiadomość  </span>                
                                                <Kbd keys={["command"]} className="flex-none text-lg bg-primary-200 text-primary-800 ">M</Kbd>                                         

                                        </div>
                                        <Divider />
                                        <div className="text-small">Wysyłanie wiadomości do wszystkich członków</div>
                                    </div>
                    } placement="bottom" className="p-2">
                        <Button color="default" size="lg" startContent={<FontAwesomeIcon icon={faEnvelope} />}>Wiadomość</Button>
                    </Tooltip>
                    <Tooltip content={<div className="px-1 py-2 min-w-24 max-w-48">
                                        <div className="font-bold flex py-1">                              
                                                <span className="text-lg flex-1">Składka  </span>                
                                                <Kbd keys={["command"]} className="flex-none text-lg bg-primary-200 text-primary-800 ">F</Kbd>                                         

                                        </div>
                                        <Divider />
                                        <div className="text-small">Ustalenie wysokości składki. akcja genberuje żądanie zapłaty od wszystkich członków.</div>
                                    </div>} placement="bottom" className="p-2">
                        <Button color="default" size="lg" startContent={<FontAwesomeIcon icon={faMoneyBillTransfer} />}>Składka</Button>
                    </Tooltip>
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
                                <AddMember onSuccess={onClose} onCancel={onClose} />
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
                                <DragAndDrop onSuccess={onClose} onCancel={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
});