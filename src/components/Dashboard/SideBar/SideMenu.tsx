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


const SideBar = () =>{

    const [active, setActive] = useState("AllItems")

    const [isOpen, setIsOpen] = useState(true)

    const handleClick = (component: string) => {
        setActive(component)
    }

    const renderComponent = () =>{
        switch(active){
            case "AllItems":
                return <DisplayData />
            case "Passwords":
                return <DisplayData />
            case "Notes":
                return <DisplayData />
            case "CreditCards":
                return <DisplayData />
            case "PswGen":
                return <DisplayData />
            default:
                return null;
        }
    }

    return (
        <div className="flex h-screen p-3 ">
            <Sidebar aria-label="Default sidebar example" className="w-1/6 bg-[#1a1a1a] rounded-lg overflow-hidden flex-col hidden sm:block">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "AllItems"} onClick={()=>{handleClick("AllItems")}} name="All items"/>
                        <SideMenuItem icon={Password} isActive={active === "Passwords"} onClick={()=>{handleClick("Passwords")}} name="Passwords"/>
                        <SideMenuItem icon={Document} isActive={active === "Notes"} onClick={()=>{handleClick("Notes")}} name="Notes"/>
                        <SideMenuItem icon={CreditCard} isActive={active === "CreditCards"} onClick={()=>{handleClick("CreditCards")}} name="Credit Cards"/>
                        <SideMenuItem icon={Trash} isActive={active === "TrashBin"} onClick={()=>{handleClick("TrashBin")}} name="Trash"/>
                        <SideMenuItem icon={Gen} isActive={active === "PswGen"} onClick={()=>{handleClick("PswGen")}} name="Password Generator"/>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <div className="flex-grow p-3">
                {renderComponent()}
            </div>
        </div>
    )
}

export default SideBar
