import { fetchImage } from "~/server/fetchImg/fetchimg"
import { DataListProps } from "./interfaces/DataList.models"
import Image from "next/image"
import React from 'react'

const DataListItem = ({ title, link, email, date, onClick, onDelete, onModify}: DataListProps) => {
    return (
        <div className="w-[80%] h-20 ml-[12%] top-5 border-1 border-[#27272a] rounded-md flex flex-row relative text-white mb-4 cursor-pointer" onClick={onClick}>
            <div className="flex items-center ml-4">
                <div className="w-8">
                    <Image src={fetchImage(link)} width={32} height={32} alt={"icon"} />
                </div>
            </div>
            <div className="flex flex-col justify-center ml-5">
                <div className="font-bold">
                    {title}
                </div>
                <div className="hidden sm:flex">
                    {email}
                </div>
           </div>
           <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:items-center sm:h-full">
                {date}
           </div>
         </div>
    )
}

export default DataListItem
