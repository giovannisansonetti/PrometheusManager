import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { AllItems } from "./AllItems"
import AllItemsListElement from "./AllItemsListElement"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import DataListIdle from "../../DisplayData/DataList/DataListIdle";

const AllItemsList = () =>{

    const [allItems, setAllItems] = useState<AllItems[] | null>()

    useEffect(() => {
        const getItems = async () => {
            const responseString = await fetchAllitems()
            if (responseString) {
                const response: AllItems[] = responseString;
                /*response.forEach(element=>{
                    if(element.data != undefined){
                        let data_date = element.data.createdAt as unknown as string
                        element.data.createdAt = new Date(data_date)
                        data_date = element.data.updatedAt as unknown as string
                        element.data.updatedAt = new Date(data_date)
                    }
                    let note_date = element.notes.createdAt as unknown as string
                    element.notes.createdAt = new Date(note_date)
                    note_date = element.notes.updatedAt as unknown as string
                    element.notes.updatedAt = new Date(note_date)
                })*/
                setAllItems(response)
            }
        }
        getItems()
    }, [])

    console.log("response: " + allItems)

     return(
        <>
            { allItems ? (
                <div className="overflow-auto overflow-x-hidden h-full mr-auto ml-auto w-full">
                    {allItems.map((item) => (
                            <div>
                              <h3>{item.notes.noteTitle}</h3>
                            </div>
                    ))}

                    {/* <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 mt-2"></ModalHeader>
                                <ModalBody>
                                    
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="flat" onClick={() => {}}>Add</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                    </Modal> */}
                    
            </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                </div>
            )} 
        </>
    )
}

export default AllItemsList