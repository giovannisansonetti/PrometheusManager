import { useState } from "react"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react"
import AllItemsListElement from "./AllItemsListElement"
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton"
import deleteData from "~/server/data/moveToTrash/deleteData"
import deleteNote from "~/server/data/moveToTrash/deleteNote"
import useSWR from "swr"
import { fetcher } from "~/server/fetcher"
import { AllItems, ApiResponse } from "~/server/data/showdata/allitems.models"
import axios from "axios"

const AllItemsList = () => {
  const { data, error, isLoading } = useSWR<ApiResponse>("/api/data/allitems", fetcher)
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onOpenChange: onPasswordModalOpenChange } = useDisclosure()
  const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onOpenChange: onNoteModalOpenChange } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<AllItems | null>(null)

  const handleClick = (item: AllItems) => {
    if (item.type === "data") {
      setSelectedItem(item)
      onPasswordModalOpen()
    }
    if (item.type === "note") {
      setSelectedItem(item)
      onNoteModalOpen()
    }
  }

  const handleDelete = async (type: string, id: string, onClose:() => void) => {
    setLoading(true)

    if (type === "data") {
        const req = { 
          id: id,
          type: "data"
        }
        const request = axios.post("/api/data/moveToTrash", req)
        const response = (await request).data

        if(response.success){
            setTimeout(() => {
                onClose()
                setLoading(false)
            }, 1000)
        }
    } else if (type === "note") {
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
    setLoading(false)
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
    <div>
        {data?.data.length ? (
            data.data.map((item) => (
            <div>
              {!item.isDeleted && (
                <AllItemsListElement item={item} date={new Date(item.createdAt).toLocaleString()} onClick={() => handleClick(item)} />
              )}
            </div>
            ))
        ) : (
            <p>No items found</p>
        )}

        <Modal isOpen={isPasswordModalOpen} onOpenChange={onPasswordModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
            <ModalContent>
            {(onClose) => (
                <>
                {selectedItem && selectedItem.type === "data" && (
                    <>
                        <ModalHeader className="flex flex-col gap-1 mt-2">
                            <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                            <div className="flex w-full border-1 border-[#27272a]"></div>
                            <div className="text-sm text-gray-500">Created on: {new Date(selectedItem.createdAt).toLocaleDateString('it-IT')}</div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-bold">Info</div>
                                <div className="text-md font-medium">Website: <span className="font-normal">{selectedItem.webSiteLink}</span></div>
                                <div className="flex w-full border-1 border-[#27272a]"></div>
                                <div className="text-md font-medium">Username: <span className="font-normal">{selectedItem.username}</span></div>
                                <div className="flex w-full border-1 border-[#27272a]"></div>
                                <div className="text-md font-medium">Password: <span className="font-normal">{selectedItem.password}</span></div>
                                <div className="flex w-full border-1 border-[#27272a]"></div>
                                <div className="text-md font-medium">Password Security: <span className="font-normal">{selectedItem.passwordSecurity}</span></div>
                                <div className="flex w-full border-1 border-[#27272a]"></div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="flat">Edit</Button>
                            {loading ? (
                            <Button color="danger" isLoading>Deleting</Button>
                            ) : (
                            <Button color="danger" variant="flat" onClick={async () => handleDelete("data", selectedItem.id, onClose)}>Delete</Button>
                            )}
                    </ModalFooter>
                    </>
                )}
                </>
            )}
            </ModalContent>
        </Modal>

        <Modal isOpen={isNoteModalOpen} onOpenChange={onNoteModalOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
            <ModalContent>
            {(onClose) => (
                <>
                {selectedItem && selectedItem.type === "note" && (
                    <>
                    <ModalHeader className="flex flex-col gap-1 mt-2">
                        <h2 className="text-2xl font-bold">{selectedItem.noteTitle}</h2>
                        <p className="text-sm text-gray-500">Created on: {new Date(selectedItem.createdAt).toLocaleDateString('it-IT')}</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Content</p>
                        <p className="text-sm">{selectedItem.noteDescription}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat">Close</Button>
                        {loading ? (
                        <Button color="danger" isLoading>Deleting</Button>
                        ) : (
                        <Button color="danger" variant="flat" onClick={async () => handleDelete("note", selectedItem.id, onClose)}>Delete</Button>
                        )}
                    </ModalFooter>
                    </>
                )}
                </>
            )}
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AllItemsList