"use client"

import { DisplayDataProps } from "./DisplayData.models"
import { useState } from "react"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { type AddItemsProps } from "./interfaces/AddItem.models";
import insertData from "~/server/data/insertdata/insertdata";
import DataList from "../DataList/DataList";

const DisplayData = ({ handleMenu, isOpen }: DisplayDataProps) => {
    const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure()

    const [form, setForm] = useState<AddItemsProps>({
        webSiteLink: "",
        username: "",
        password: "",
        notes: ""
    })

    return (
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                <h1 className=""></h1>
                
                <div className="flex justify-end items-center mt-5 mr-7">
                    <div className="w-full block sm:hidden">
                        <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>

                    <Button color="primary" variant="flat" onClick={onOpen}>
                        Add an item
                    </Button>
                </div>
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>
            <DataList />
            <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2">Add an item</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Website"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setForm(f => ({ ...f, webSiteLink: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setForm(f => ({ ...f, username: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setForm(f => ({ ...f, password: value }))
                                    }}
                                />
                                <Textarea
                                    label="Notes"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setForm(f => ({ ...f, notes: value }))
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>Reset</Button>
                                <Button color="primary" variant="flat" onClick={async () => { await insertData(form) }}>Add</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DisplayData
