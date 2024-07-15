"use client"

import { DisplayDataProps } from "./DisplayData.models"

const DisplayData = ({ link, icon, email, date, type }: DisplayDataProps) => {
    return (
        <div className="flex flex-col bg-[#1a1a1a] text-white w-full h-full rounded-lg overflow-hidden overflow-y-auto">
            {/*<div className="flex w-full border-b-2"></div>*/}
            
        </div>
    )
}

export default DisplayData
