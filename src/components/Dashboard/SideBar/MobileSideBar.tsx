"use client"

import { Sidebar } from "flowbite-react"
import SideMenuItem from "./SideMenuItem"
import AllItemsLogo from "~/../public/SideBar/allitems.svg"
import { useState } from "react"
import DisplayData from "../DisplayData/DisplayData"

import CreditCard from "~/../public/SideBar/CreditCard.svg"
import Document from "~/../public/SideBar/Document.svg"
import Password from "~/../public/SideBar/Password.svg"
import Settings from "~/../public/SideBar/Settings.svg"
import Trash from "~/../public/SideBar/Trash.svg"
import Gen from "~/../public/SideBar/Gen.svg"
import Image from "next/image"
import { SideMenuProps } from "./SideMenu.models"


const MobileSideBar = ({ active, setActive, isOpen }: SideMenuProps) => {
    const handleClick = (component: string) => {
        setActive(component)
    }
    return (
        <>
            
            {isOpen && (
                <div className="sm:hidden bg-[#161616] p-3">
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("AllItems") }}><Image className="mr-2" width={20} height={20} src={AllItemsLogo} alt={"title"} />All items</div>
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("Passwords") }}><Image className="mr-2" width={20} height={20} src={Password} alt={"title"} /> Passwords</div>
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("Notes") }}><Image className="mr-2" width={20} height={20} src={Document} alt={"title"} /> Notes</div>
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("Credit Card") }}><Image className="mr-2" width={20} height={20} src={CreditCard} alt={"title"} /> Credit Cards</div>
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("TrashBin") }}><Image className="mr-2" width={20} height={20} src={Trash} alt={"title"} /> Trash</div>
                    <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={() => { handleClick("PswGen") }}><Image className="mr-2" width={20} height={20} src={Gen} alt={"title"} /> Password Generator</div>
                </div>
            )}
        </>
    )
}

export default MobileSideBar