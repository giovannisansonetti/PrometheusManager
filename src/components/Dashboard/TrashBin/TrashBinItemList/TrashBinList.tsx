import { useEffect, useState } from "react"
import { AllItems, ApiResponse } from "~/server/data/showdata/allitems.models"
import TrashBinListElement from "./TrashBinListElement"
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton"
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react"
import useSWR from "swr"
import deleteItem from "~/server/data/manageData/delete/deleteItem"
import deleteNote from "~/server/data/manageData/delete/deleteNote"
import restoreItem from "~/server/data/manageData/restore/restoreItem"
import restoreNote from "~/server/data/manageData/restore/restoreNote"
import { fetcher } from "~/server/fetcher"

const TrashBinList = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    
    const { data, error, isLoading } = useSWR<ApiResponse>("/api/data/allitems", fetcher)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [restoreLoading, setRestoreLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState<AllItems | null>(null)

    const handleClick = (item: AllItems) => {
        setSelectedItem(item)
        onOpen()
    }

    const handleDelete = async (item: AllItems) => {
        setDeleteLoading(true)
        if (item.type === "data") {
            await deleteItem(item.id)
        } else if (item.type === "note") {
            await deleteNote(item.id)
        }
        setDeleteLoading(false)
    }

    // Function to handle restoring the selected item
    const handleRestore = async (item: AllItems) => {
        setRestoreLoading(true)
        if (item.type === "data") {
            await restoreItem(item.id)
        } else if (item.type === "note") {
            await restoreNote(item.id)
        }
        setRestoreLoading(false)
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

    return (
        <div>
            {data?.data.length ? (
                data.data.map((item) => (
                    <TrashBinListElement
                        key={item.id} 
                        item={item}
                        onClick={() => handleClick(item)}
                    />
                ))
            ) : (
                <p>No items found</p>
            )}

            {selectedItem && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 mt-2">
                                    {selectedItem.type === "data" ? (
                                        <>Delete or Restore Data</>
                                    ) : (
                                        <>Delete or Restore Note</>
                                    )}
                                </ModalHeader>
                                <ModalFooter>
                                    {restoreLoading ? (
                                        <Button color="primary" isLoading>Restoring...</Button>
                                    ) : (
                                        <Button 
                                            color="primary"
                                            variant="flat"
                                            onClick={async () => { await handleRestore(selectedItem) }}
                                        >
                                            Restore
                                        </Button>
                                    )}
                                    {deleteLoading ? (
                                        <Button color="danger" isLoading>Deleting...</Button>
                                    ) : (
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            onClick={async () => { await handleDelete(selectedItem) }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}

export default TrashBinList
