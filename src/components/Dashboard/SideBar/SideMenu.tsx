"use client"

import { Sidebar } from "flowbite-react";
import SideMenuItem from "./SideMenuItem";
import AllItemsLogo from "~/../public/SideBar/allitems.svg"
import { useState } from "react"

const SideBar = () =>{

    const [active, setActive] = useState("AllItems")

    const handleClick = (component: string) => {
        setActive(component)
    }

    const renderComponent = () =>{
        switch(active){
            case "AllItems":
                return 
            case "Passwords":
                return
            case "Notes":
                return
            case "CreditCards":
                return
            case "PswGen":
                return
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col h-screen p-3">
            {renderComponent()}
            <Sidebar aria-label="Default sidebar example" className="w-1/6 bg-[#1a1a1a] rounded overflow-hidden flex-grow">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "AllItems"} onClick={()=>{handleClick("AllItems")}} name="All items"/>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "Passwords"} onClick={()=>{handleClick("Passwords")}} name="Passwords"/>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "Notes"} onClick={()=>{handleClick("Notes")}} name="Notes"/>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "CreditCards"} onClick={()=>{handleClick("CreditCards")}} name="Credit Cards"/>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "TrashBin"} onClick={()=>{handleClick("TrashBin")}} name="Trashbin"/>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "PswGen"} onClick={()=>{handleClick("PswGen")}} name="Password Generator"/>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar