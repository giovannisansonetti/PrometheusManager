import { useEffect, useState } from "react";
import { type Data } from "./interfaces/Data";
import { fetchData } from "~/server/data/showdata/showdata";
import DataListItem from "./DataListItem";
import DataListIdle from "./DataListIdle";
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

const DataList = () =>{

    const [data, setData] = useState<Data[] | null>(null)
    const [selectData, setSelectData] = useState<Data | null>(null)
    const [error, setError] = useState("")
    const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure()

    const handleClick = (data: Data) =>{
        setSelectData(data)
        onOpen()
    }

    useEffect(() => {
        const getData = async () => {
            const responseString = await fetchData()
            if (responseString) {
                const response: Data[] = JSON.parse(responseString);
                response.forEach(element=>{
                    let date = element.createdAt as unknown as string
                    element.createdAt = new Date(date)
                    date = element.updatedAt as unknown as string
                    element.updatedAt = new Date(date)
                })
                setData(response)
                }
            }
            getData()
    }, [])
    
    return(
        <>
            { data ? (
                <div className="overflow-auto overflow-x-hidden h-full mr-auto ml-auto w-full">
                    {data.map((item) => (
                            <DataListItem title={item.title} link={item.webSiteLink} email={item.username} date={item.createdAt.toLocaleDateString('it-IT')} onClick={() =>{handleClick(item)}}></DataListItem>
                    ))}
                    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} className="w-[80%] bottom-[25%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                        <ModalContent>
                        {(onClose) => (
                            <>
                                <>
                                    <ModalHeader className="flex flex-col gap-1 mt-2">
                                    {selectData && (
                                            <>
                                                <h2 className="text-2xl font-bold">{selectData.title}</h2>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-sm text-gray-500">
                                                    Created on: {selectData.createdAt.toLocaleDateString('it-IT')}
                                                </p>
                                            </>
                                    )}
                                    </ModalHeader>
                                    <ModalBody>
                                        {selectData && (
                                            <div className="flex flex-col gap-2">
                                            <p className="text-lg font-bold">Info</p>
                                            <div className="flex flex-col rounded-md shadow-sm">
                                                <p className="text-md font-medium">
                                                    Website: <span className="font-normal">{selectData.webSiteLink}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Username: <span className="font-normal">{selectData.username}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Password: <span className="font-normal">{selectData.password}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                {selectData.passwordSecurity && (
                                                    <p className="text-sm font-medium">
                                                        Security: <span className="font-normal">{selectData.passwordSecurity}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        )}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" variant="flat" onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </>
                                </>
                            )}
                        </ModalContent>
                        </Modal>
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

export default DataList