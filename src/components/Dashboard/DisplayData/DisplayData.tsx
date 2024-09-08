"use client"

import { DisplayDataProps } from "./interfaces/DisplayData.models"
import { useState } from "react"
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import { type AddItemsProps } from "./interfaces/AddItem.models"
import { useRouter } from 'next/navigation'
import DataList from "./DataItemList/DataList"
import insertData from "~/server/data/insertdata/insertdata"
import AlertEvent from "~/components/Events/Alerts/Alert"

const DisplayData = ({ handleMenu, isOpen }: DisplayDataProps) => {
    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onOpenChange: onPasswordModalOpenChange } = useDisclosure()
    
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string>("")

    const [dataform, setDataForm] = useState<AddItemsProps>({
        title: "",
        webSiteLink: "",
        username: "",
        password: "",
        notes: ""
    })

    const handlePasswordClick = async (onClose: ()=> void) => {
        if(dataform.title !== "" && dataform.webSiteLink !== "" && dataform.password !== ""){
            setLoading(true)
            try{
                await insertData(dataform)
                setSuccess(true)
                setTimeout(()=>{
                    onClose() 
                    setSuccess(false)
                    router.refresh()
                }, 2000)
            }catch(error){
                setError("There was an error while adding your item")
            }finally{
                setLoading(false)
            }  
        } else {
            setError("Please fill in all required fields.")
        }
    }

    return (
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                <div className="flex justify-end items-center mt-5 mr-7 ">
                    <div className="w-full block sm:hidden">
                        <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={onPasswordModalOpen}
                    >
                        Add data
                    </Button>
                </div>
                
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>

            <DataList />

            <Modal isOpen={isPasswordModalOpen} onOpenChange={onPasswordModalOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                        { success ? (
                            <div className="flex justify-center items-center">
                                <AlertEvent type="success" description="Item added correctly" className="w-2/4 mt-3"/>
                            </div>
                        ) : null}
                        
                        { error ? (
                        <div className="flex justify-center items-center">
                            <AlertEvent type="error" description={error} className="w-2/4 mt-3"/>
                        </div>
                        ) : null}
                            <ModalHeader className="flex flex-col gap-1 mt-2">Add an item</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Title"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, title: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Website"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, webSiteLink: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, username: value }))
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, password: value }))
                                    }}
                                />
                                <Textarea
                                    label="Notes"
                                    size="sm"
                                    className="w-full"
                                    onValueChange={(value) => {
                                        setDataForm(props => ({ ...props, notes: value }))
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                            {loading ? (
                                <Button color="primary" isLoading>Adding item</Button>
                            ) : (
                                <Button color="primary" variant="flat" onClick={async () => { await handlePasswordClick(onClose) }}>Add</Button>
                            )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DisplayData