import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import DataListIdle from "../../DisplayData/DataList/DataListIdle"
import { AllItems } from "~/server/data/showdata/allitems.models"
import AllItemsListElement from "./AllItemsListElement"

const AllItemsList = () =>{

    const [items, setItems] = useState<AllItems[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const getItems = async() => {
            const responseString = await fetchAllitems()
            if(responseString){
                const response: AllItems[] = JSON.parse(responseString)
                console.log(response)
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
                            <AllItemsListElement item={item} date={item.createdAt.toLocaleString()} />
                        </div>
                    ))}
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
        </div>
      )
    }


export default AllItemsList