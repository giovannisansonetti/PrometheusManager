import { useEffect, useState } from "react";
import { type Data } from "./interfaces/Data";
import DataListItem from "./DataListItem";
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import deleteData from "~/server/data/moveToTrash/deleteData";
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json()) 

const DataList = () =>{
    const { data, error, isLoading } = useSWR<Data[]>('/api/data/showData', fetcher)
    console.log(data)

    //const [data, setData] = useState<Data[] | null>(null)
    const [selectData, setSelectData] = useState<Data | null>(null)
    const [noData, setNoData] = useState<string | null>(null)
    const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure()

    const handleClick = (data: Data) =>{
        setSelectData(data)
        onOpen()
    }

    if (error) {
        return <div>Error loading data.</div>;
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


    return(
        <>
            { data ? (
                <div className="overflow-auto overflow-x-hidden h-full mr-auto ml-auto w-full">
                    {data.map((item) => {
                        const createdAtDate = new Date(item.createdAt)
                        return (
                            <DataListItem 
                                key={item.id} 
                                title={item.title} 
                                link={item.webSiteLink} 
                                email={item.username} 
                                date={createdAtDate.toLocaleDateString('it-IT')} 
                                onClick={() => handleClick(item)}
                            />
                        )
                    })}
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
                                                <p className="text-md font-medium mt-2 overflow-hidden text-ellipsis">
                                                    Password: <span className="font-normal">{selectData.password}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                                <p className="text-md font-medium mt-2">
                                                    Password Security: <span className="font-normal">{selectData.passwordSecurity}</span>
                                                </p>
                                                <div className="flex w-full mt-1 border-1 border-[#27272a]"></div>
                                            </div>
                                        </div>
                                        )}
                                    </ModalBody>
                                    { selectData && (
                                        <ModalFooter>                                       
                                            <Button color="danger" variant="flat" onClick={async() =>{deleteData(selectData.id)}}>Delete data</Button>
                                            <Button color="primary" variant="flat" onClick={onClose}>Close</Button>
                                        </ModalFooter>
                                    )}
                                </>
                                </>
                            )}
                        </ModalContent>
                        </Modal>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    {noData ? (<></>) : (
                        <>
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
                    </>
                    )}
                </div>
            )} 
        </>
    )
}

export default DataList