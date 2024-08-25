"use client"

import { type AddItemsProps, type AddNotesProps } from "./interfaces/AddItem.models"
import { useState } from "react"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { AddNoteProps } from "../DisplayNotes/interfaces/AddNote.models"
import { insertNote } from "~/server/data/insertdata/insertNotes"
import AllItemsList from "./AllItemsList/AllItemsList"
import insertData from "~/server/data/insertdata/insertdata"
import { DisplayItemsProps } from "./interfaces/DisplayData.models"

const AllItems = ({ handleMenu, isOpen }: DisplayItemsProps) => {
    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onOpenChange: onPasswordModalOpenChange } = useDisclosure()
    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onOpenChange: onNoteModalOpenChange } = useDisclosure()

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [dataform, setDataForm] = useState<AddItemsProps>({
        title: "",
        webSiteLink: "",
        username: "",
        password: "",
        notes: ""
    })

    const [noteForm, setNoteForm] = useState<AddNoteProps>({
        title: "", 
        description: "",
    })

    const handlePasswordClick = async () => {
        if(dataform.title !== "" && dataform.webSiteLink !== "" && dataform.password !== ""){
            setLoading(true)
            await insertData(dataform)
            // display success message 
            router.refresh()
            setLoading(false)
        }

        // display error message
    }

    const handleNoteClick = async () => {
        if(noteForm.title !== "" && noteForm.description !== ""){
            setLoading(true)
            await insertNote(noteForm)
            router.refresh()
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                <div className="flex justify-end items-center mt-5 mr-7 ">
                    <div className="w-full block sm:hidden">
                        <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>

                    <Dropdown className="bg-[#161616]">
                        <DropdownTrigger>
                            <Button
                                color="primary"
                                variant="flat"
                            >
                                Add an item
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new" onClick={onPasswordModalOpen}>Password</DropdownItem>
                            <DropdownItem key="copy" onClick={onNoteModalOpen}>Note</DropdownItem>
                            <DropdownItem key="edit">Credit Card</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>

            <AllItemsList />

            <Modal isOpen={isPasswordModalOpen} onOpenChange={onPasswordModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2">Add an item</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Title"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, title: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Website"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, webSiteLink: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, username: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, password: value }))
                                    }}
                                />
                                <Textarea
                                    label="Notes"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, notes: value }))
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                {loading ? (<Button color="primary" isLoading>Adding item</Button>) : (<Button color="primary" variant="flat" onClick={async () => { await handlePasswordClick() }}>Add</Button> )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isNoteModalOpen} onOpenChange={onNoteModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2">Create a secure note</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Note title"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setNoteForm(props => ({ ...props, title: value }))
                                    }}
                                />              
                                <Textarea
                                    isRequired
                                    label="Description"
                                    size="sm"
                                    onValueChange={(value) => {
                                        setNoteForm(props => ({ ...props, description: value }))
                                    }}
                                    disableAnimation
                                    disableAutosize
                                    classNames={{
                                        base: "w-full",
                                        input: "resize-y min-h-[40px]",
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                {loading ? (<Button color="primary" isLoading>Adding item</Button>) : (<Button color="primary" variant="flat" onClick={async () => { await handleNoteClick() }}>Add</Button>)}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AllItems
