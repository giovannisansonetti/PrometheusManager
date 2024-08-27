import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import { AllItems } from "~/server/data/showdata/allitems.models"
import AllItemsListElement from "./AllItemsListElement"
import Data from "./interfaces/Data.models"
import Note from "./interfaces/Note.models"
import deleteData from "~/server/data/moveToTrash/deleteData"
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton"
import deleteNote from "~/server/data/moveToTrash/deleteNote"
import Alert from "~/components/Events/Alerts/Alert"

const AllItemsList = () =>{

    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onOpenChange: onPasswordModalOpenChange } = useDisclosure()
    const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onOpenChange: onNoteModalOpenChange } = useDisclosure()

    const [loading, setLoading] = useState(false)

    const [items, setItems] = useState<AllItems[] | null>(null)

    const [error, setError] = useState("")
    
    const [data, setData] = useState<Data | null>(null)
    const [note, setNote] = useState<Note | null>(null)

    const handleClick = (item: AllItems) =>{
        console.log("Item clicked:", item); // Debugging log
        if(item.type === "data"){
            setData(item)
            onPasswordModalOpen()
        }
        if(item.type === "note"){
            setNote(item)
            onNoteModalOpen()
        }
    }

    const handleDelete = async(type: string, id: string) =>{
        if(type === "data"){
            setLoading(true)
            await deleteData(id)
            setLoading(false)
        }
        if(type === "note"){
            setLoading(true)
            await deleteNote(id)
            setLoading(false)
        }
    }   

    useEffect(() => {
        const getItems = async() => {
            const responseString = await fetchAllitems()
            if(responseString){
                const response: AllItems[] = JSON.parse(responseString)
                response.forEach(element => {
                element.createdAt = new Date(element.createdAt)
                element.updatedAt = new Date(element.updatedAt)})
                setItems(response)
            }
        }
        getItems() 
    }, [])

    return (
        <div>
            {items ? (
                <div>
                    {items.map((item) => (
                        <div key={item.id}>
                            <AllItemsListElement item={item} date={item.createdAt.toLocaleString()} onClick={() => {handleClick(item)}}/>
                        </div>
                    ))}

                    <Modal isOpen={isPasswordModalOpen} onOpenChange={onPasswordModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                        {(onClose) => (
                            <>
                                <>
                                    <ModalHeader className="flex flex-col gap-1 mt-2">
                                    {data && (
                                            <>
                                                <h2 className="text-2xl font-bold">{data.title}</h2>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-sm text-gray-500">
                                                    Created on: {data.createdAt.toLocaleDateString('it-IT')}
                                                </p>
                                            </>
                                    )}
                                    </ModalHeader>
                                    <ModalBody>
                                        {data && (
                                            <div className="flex flex-col gap-2">
                                            <p className="text-lg font-bold">Info</p>
                                            <div className="flex flex-col rounded-md shadow-sm">
                                                <p className="text-md font-medium">
                                                    Website: <span className="font-normal">{data.webSiteLink}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Username: <span className="font-normal">{data.username}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Password: <span className="font-normal">{data.password}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Password Security: <span className="font-normal">{data.passwordSecurity}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                            </div>
                                        </div>
                                        )}
                                    </ModalBody>
                                    {data &&
                                        <ModalFooter>
                                            <Button color="primary" variant="flat">Edit</Button>
                                            {loading ? (<Button color="danger" isLoading>Deleting</Button>) : (<Button color="danger" variant="flat" onClick={async() =>{handleDelete("data", data.id)}}>Delete</Button>)}
                                        </ModalFooter>
                                    }
                                </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <Modal isOpen={isNoteModalOpen} onOpenChange={onNoteModalOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                        {(onClose) => (
                            <>
                                    <ModalHeader className="flex flex-col gap-1 mt-2">
                                    {note && (
                                            <>
                                                <h2 className="text-2xl font-bold">{note.noteTitle}</h2>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-sm text-gray-500">
                                                    Created on: {note.createdAt.toLocaleDateString('it-IT')}
                                                </p>
                                            </>
                                    )}
                                    </ModalHeader>
                                    <ModalBody>
                                        {note && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-lg font-bold">Content</p>
                                                <p className="text-sm">{note.noteDescription}</p>
                                            </div>
                                        )}
                                    </ModalBody>
                                    {note &&
                                        <ModalFooter>
                                            <Button color="primary" variant="flat" onClick={onClose}>Close</Button>
                                            {loading ? (<Button color="danger" isLoading>Deleting</Button>) : (<Button color="danger" variant="flat" onClick={async() => {handleDelete("note", note.id)}}>Delete</Button>)}
                                        </ModalFooter>
                                    }
                            </>
                        )}
                    </ModalContent>
                    </Modal>

                </div>

            ) : (
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
                    <ListSkeleton />
                    <ListSkeleton />
                </div>
            )}
        </div>
      )
    }


export default AllItemsList