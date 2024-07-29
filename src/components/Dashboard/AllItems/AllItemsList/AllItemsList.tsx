import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import DataListIdle from "../../DisplayData/DataList/DataListIdle"
import { AllItems } from "~/server/data/showdata/allitems.models"

const AllItemsList = () =>{

    const [items, setItems] = useState<AllItems[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const getItems = async () => {
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
            <h1>All Items</h1>
            <ul>
                {items.map((item) => (
                <li key={item.id}>
                    {item.type === 'data' ? (
                    <>
                        <strong>Data Item:</strong>
                        <p>Title: {item.title}</p>
                        <p>Website: {item.webSiteLink}</p>
                        <p>Username: {item.username}</p>
                        <p>Notes: {item.notes}</p>
                    </>
                    ) : (
                    <>
                        <strong>Note Item:</strong>
                        <p>Note Title: {item.noteTitle}</p>
                        <p>Note Description: {item.noteDescription}</p>
                    </>
                    )}
                    <p>Created At: {item.createdAt.toLocaleString()}</p>
                    <p>Updated At: {item.updatedAt.toLocaleString()}</p>
                </li>
                ))}
            </ul>
            </div>
        )
    }


     /* (
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
    </div> */

export default AllItemsList