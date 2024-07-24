import { useEffect, useState } from "react";
import { type Note } from "../interfaces/Note";
import { fetchNotes } from "~/server/data/showdata/showNotes";
import NotesListItem from "./NotesItemList";
import NotesIdle from "./NotesIdle";
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import NoteIcon from "~/../public/SideBar/Document.svg"

const NotesList = () =>{

    const [note, setNote] = useState<Note[] | null>(null)
    const [selectNote, setSelectNote] = useState<Note | null>(null)

    const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure()

    const handleClick = (note: Note) =>{
        setSelectNote(note)
        onOpen()
    }

    useEffect(() => {
        const getNotes = async () => {
            const responseString = await fetchNotes()
            if (responseString) {
                const response: Note[] = JSON.parse(responseString);
                response.forEach(element=>{
                    let date = element.createdAt as unknown as string
                    element.createdAt = new Date(date)
                    date = element.updatedAt as unknown as string
                    element.updatedAt = new Date(date)
                })
                setNote(response)
            }
        }
        getNotes()
    }, [])
    
    return(
        <>
            { note ? (
                <div className="overflow-auto overflow-x-hidden h-full mr-auto ml-auto w-full">
                    {note.map((item) => (
                            <NotesListItem image={NoteIcon} title={item.noteTitle} date={item.createdAt.toLocaleDateString('it-IT')} onClick={() =>{handleClick(item)}} />
                    ))}
                    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 mt-2"></ModalHeader>
                                <ModalBody>
                                    {/* {selectData && ( 
                                        TODO
                                    )}*/}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="flat" onClick={() => {}}>Add</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                    </Modal>
                    
            </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                    <NotesIdle />
                </div>
            )} 
        </>
    )

}

export default NotesList