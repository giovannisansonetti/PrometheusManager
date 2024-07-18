"use client"

import { DisplayDataProps } from "./DisplayData.models"
import { useState } from "react"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import  {type AddItemsProps} from "./AddItem.models";
import insertData from "~/server/data/insertdata/insertdata";

const DisplayData = ({ link, icon, email, date, type }: DisplayDataProps) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const [form, setForm] = useState<AddItemsProps>({
        webSiteLink: "",
        username: "",
        password: "",
        notes: ""
    })


    return (
        <div className="flex flex-col bg-[#161616] text-white w-full h-full rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                    <h1 className=""></h1>
                    <div className="flex justify-end mt-5 mr-8  sm:mr-7 ">
                        <Button color="primary" variant="flat" onClick={onOpen}>
                                Add an item
                        </Button>
                    </div>
                    <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>

            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-2/4 bg-[#0a0a0a]">
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
                            onValueChange={(value) =>{
                                setForm(f =>({ ...f, webSiteLink: value }))
                            }}
                        />
                        <Input
                            isRequired
                            label="Email"
                            size="sm"
                            className="w-full"
                            onValueChange={(value) =>{
                                setForm(f =>({ ...f, username: value }))
                            }}
                        />
                        <Input
                            isRequired
                            label="Password"
                            size="sm"
                            className="w-full"
                            onValueChange={(value) =>{
                                setForm(f =>({ ...f, password: value }))
                            }}
                        />
                        <Textarea
                            isRequired
                            label="Notes"
                            size="sm"
                            className="w-full"
                            onValueChange={(value) =>{
                                setForm(f =>({ ...f, notes: value }))
                            }}
                        />
                        </ModalBody>
                        <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>Reset</Button>
                                <Button color="primary" variant="flat" onClick={async() =>{await insertData(form)}}>Add</Button>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
        
    )
}

export default DisplayData
