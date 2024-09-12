import { useEffect, useState } from "react"
import { type Note } from "../interfaces/Note"
import NotesListItem from "./NotesListElement"
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import NoteIcon from "~/../public/SideBar/Document.svg"
import useSWR from 'swr'
import { fetcher } from "~/server/fetcher"
import {type ApiResponse} from "../interfaces/NotesList.models"
import axios from "axios"

const NotesList = () => {

    const { data, error, isLoading } = useSWR<ApiResponse>('/api/data/showNotes', fetcher)

    //const { data, error, isLoading } = useSWR<Note[]>('/api/data/showNotes', fetcher)
    console.log(data)

    const [selectNote, setSelectNote] = useState<Note | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [errorAlert, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure()

    const handleClick = (note: Note) => {
        setSelectNote(note)
        onOpen()
    }

    const handleDelete = async(id: string, onClose: ()=>void) =>{
        setLoading(true)

        const req = {
            id: id,
            type: "note"
        }
        const request = axios.post("/api/data/moveToTrash", req)
        const response = (await request).data

        if(response.success){
            setTimeout(() => {
                onClose()
                setLoading(false)
            }, 1000)
        }
       
    }   

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
            </div>
        )
    }

    if (!Array.isArray(data?.data)) {
        return (
            <div className="flex flex-col justify-center items-center mt-5">
                {data && data.message && (
                    <p className="text-gray-500">{data.message}</p>
                )}

                {data && data.error && (
                    <p className="text-gray-500">{data.error}</p>
                )}
            </div>
        )
    }

    return (
        <>
            { data ? (
                <div className="overflow-auto overflow-x-hidden h-full mr-auto ml-auto w-full">
                    {data.data?.map((item) => {
                        return(
                            <div>
                            {!item.isDeleted && (
                                <NotesListItem image={NoteIcon} title={item.noteTitle} date={new Date(item.createdAt).toLocaleDateString('it-IT')} onClick={() => handleClick(item)}/>
                            )}
                            </div>
                        )}
                    )}

                    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 mt-2">
                                        {selectNote && (
                                            <>
                                                <h2 className="text-2xl font-bold">{selectNote.noteTitle}</h2>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-sm text-gray-500">
                                                    Created on: {new Date(selectNote.createdAt).toLocaleDateString('it-IT')}
                                                </p>
                                            </>
                                        )}
                                    </ModalHeader>
                                    <ModalBody>
                                        {selectNote && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-lg font-bold">Content</p>
                                                <p className="text-sm">{selectNote.noteDescription}</p>
                                            </div>
                                        )}
                                    </ModalBody>
                                    
                                    {selectNote && (
                                        <ModalFooter>
                                            {loading ? (<Button color="danger" isLoading>Deleting</Button>) : (<Button color="danger" variant="flat" onClick={async() => {handleDelete(selectNote.id, onClose)}}>Delete note</Button>)}                                        
                                            <Button color="primary" variant="flat" onPress={onClose}>Close</Button>
                                        </ModalFooter>
                                    )}
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            ) : (
                <div>No notes found</div>
            )}
        </>
    )
}

export default NotesList
