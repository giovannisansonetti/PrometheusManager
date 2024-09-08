import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { AllItems } from "~/server/data/showdata/allitems.models"
import TrashBinListElement from "./TrashBinListElement"
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import Data from "~/components/Dashboard/AllItems/AllItemsList/interfaces/Data.models"
import Note from "~/components/Dashboard/AllItems/AllItemsList/interfaces/Note.models"

import deleteItem from "~/server/data/manageData/delete/deleteItem"
import restoreItem from "~/server/data/manageData/restore/restoreItem"
import restoreNote from "~/server/data/manageData/restore/restoreNote"
import deleteNote from "~/server/data/manageData/delete/deleteNote"

const TrashBinList = () =>{

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [items, setItems] = useState<AllItems[] | null>(null)

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [restoreLoading, setRestoreLoading] = useState(false)

    const [data, setData] = useState<Data | null>(null)
    const [note, setNote] = useState<Note | null>(null)
    
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

    const handleClick = (item: AllItems) =>{
        console.log("Item clicked:", item); // Debugging log
        if(item.type === "data"){
            setData(item)
            onOpen()
        }
        if(item.type === "note"){
            setNote(item)
            onOpen()
        }
    }

    const handleDelete = async(type: string, id: string) =>{
        if(type === "data"){
            setDeleteLoading(true)
            await deleteItem(id)
            setDeleteLoading(false)
        }
        if(type === "note"){
            setDeleteLoading(true)
            await deleteNote(id)
            setDeleteLoading(false)
        }
    }  
    
    const handleRestore = async(type: string, id: string) =>{
        if(type === "data"){
            setRestoreLoading(true)
            await restoreItem(id)
            setRestoreLoading(false)
        }
        if(type === "note"){
            setRestoreLoading(true)
            await restoreNote(id)
            setRestoreLoading(false)
        }
    }  

    return(
        <div>
            {items ? (
                <div>
                    {items.map((item) =>(
                        <TrashBinListElement item={item} onClick={() => handleClick(item)}/>
                    ))}

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                {data && (
                                    <div>
                                        <ModalHeader className="flex flex-col gap-1 mt-2">
                                            Delete or restore item
                                        </ModalHeader>
                                        <ModalFooter>
                                            {restoreLoading ? (<Button color="primary" isLoading>Deleting item</Button>) : (<Button color="primary" variant="flat" onClick={async() => { handleRestore("data", data.id)} }>Restore Item</Button>)}
                                            {deleteLoading ? (<Button color="danger" isLoading>Deleting item</Button>) : (<Button color="danger" variant="flat" onClick={async() => { handleDelete("data", data.id)} }>Delete</Button>)}
                                        </ModalFooter>
                                    </div>
                                )}
                                {note && (
                                    <div>
                                        <ModalHeader className="flex flex-col gap-1 mt-2">
                                            Delete or Restore note
                                        </ModalHeader>
                                        <ModalFooter>
                                            {restoreLoading ? (<Button color="primary" isLoading>Restoring Item</Button>) : (<Button color="primary" variant="flat" onClick={async() => { handleRestore("note", note.id)} }>Restore Note</Button>)}
                                            {deleteLoading ? (<Button color="danger" isLoading>Deleting note</Button>) : (<Button color="danger" variant="flat" onClick={async() => { handleDelete("note", note.id)} }>Delete</Button>)}
                                        </ModalFooter>
                                    </div>
                                )
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

export default TrashBinList