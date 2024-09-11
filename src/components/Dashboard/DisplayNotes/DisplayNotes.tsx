import { useState } from "react"
import { DisplayNotesProps } from "./DisplayNotes.models"
import { AddNoteProps } from "./interfaces/AddNote.models"
import {Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Input, Textarea, Button, useDisclosure } from "@nextui-org/react"
import { insertNote } from "~/server/data/insertdata/insertNotes"
import NotesList from "./NotesItemList/NotesList"
import AlertEvent from "~/components/Events/Alerts/Alert"
import axios from "axios"

const DisplayNotes = ({handleMenu, isOpen}: DisplayNotesProps) =>{

    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onOpenChange: onNoteModalOpenChange } = useDisclosure()

    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const [noteForm, setNoteForm] = useState<AddNoteProps>({
        title: "", 
        description: "",
    })

    const handleNoteClick = async (onClose: ()=> void) => {
        if (!noteForm.title || !noteForm.description) {
            setError(true)
            setMessage("Fill all the fields")
            setTimeout(() => {
                setError(false)
                setMessage("")
            }, 2000)
            return
        }

        setLoading(true)
        const req = axios.post("/api/data/insertNotes", { 
            title: noteForm.title,
            description: noteForm.description
        })

        const response = (await req).data

        if(response.success){
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setLoading(false)
            }, 1000)
        }
    }

    return (
        <div className="flex flex-col bg-[#161616] text-white w-full h-full lg:rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                <div className="flex justify-end items-center mt-5 mr-7 ">
                    <div className="w-full block sm:hidden">
                        <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={onNoteModalOpen}
                    >
                        Add a Note
                    </Button>
                    </div>
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>

            <NotesList />

            <Modal isOpen={isNoteModalOpen} onOpenChange={onNoteModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            { success ? (
                            <div className="flex justify-center items-center">
                                <AlertEvent type="success" description="Item added correctly" className="w-2/4 mt-3"/>
                            </div>
                            ) : null}
                        
                            { error ? (
                            <div className="flex justify-center items-center">
                                <AlertEvent type="error" description={message} className="w-2/4 mt-3"/>
                            </div>
                            ) : null}
                            
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
                            {loading ? (<Button color="primary" isLoading>Adding item</Button>) : (<Button color="primary" variant="flat" onClick={async () => { await handleNoteClick(onClose) }}>Add</Button> )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}   

export default DisplayNotes