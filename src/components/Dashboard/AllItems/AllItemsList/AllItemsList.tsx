import { useEffect, useState } from "react"
import { fetchAllitems } from "~/server/data/showdata/showAllItems"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import DataListIdle from "../../DisplayData/DataList/DataListIdle";
import { Note } from "@prisma/client";


const AllItemsList = () =>{

    const [allItems, setItems] = useState({ data: [], notes: [] });
    const [error, setError] = useState("")

    useEffect(() => {
        const getItems = async () => {
            const responseString = await fetchAllitems()
            if(responseString){
                const response = JSON.parse(responseString)
                if(response.error){
                    setError(response.error)
                }
                setItems({data: response.data, notes: response.notes})
            }
        }
            getItems()
        }, [])

        return (
            <div>
                <h2>Notes</h2>
                {allItems.notes.length > 0 ? (
                    allItems.notes.map((note: Note) => (
                        <div key={note.id}>
                            <h3>{note.noteTitle}</h3>
                            <p>{note.noteDescription}</p>
                        </div>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
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