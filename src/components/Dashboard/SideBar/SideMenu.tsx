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

const SideBar = () =>{

    const [active, setActive] = useState("AllItems")

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (component: string) => {
        setActive(component)
    }

    const handleMenu = () =>{
        setIsOpen(!isOpen)
    }

    const renderComponent = () =>{
        switch(active){
            case "AllItems":
                return <DisplayData title={"All items"} handleMenu={handleMenu} isOpen={isOpen}/>
            case "Passwords":
                return <DisplayData title={"Passwords"} handleMenu={handleMenu} isOpen={isOpen }/>
            case "Notes":
                return <DisplayData title={"Notes"} handleMenu={handleMenu} isOpen={isOpen}/>
            case "CreditCards":
                return <DisplayData title={"Credit Card"} handleMenu={handleMenu} isOpen={isOpen}/>
            case "PswGen":
                return <DisplayData title={""} handleMenu={handleMenu} isOpen={isOpen}/>
            default:
                return null;
        }
    }

    return (
        <div className="flex h-screen sm:p-3 ">
            <Sidebar aria-label="Default sidebar example" className="w-1/6 bg-[#161616] rounded-lg overflow-x-hidden flex-col hidden sm:block p-3">
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
            <div className="flex-grow sm:p-3">
                {isOpen && (
                    <div className="sm:hidden bg-[#161616] p-3">
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("AllItems")}}><Image className="mr-2" width={20} height={20} src={AllItemsLogo} alt={"title"}/>All items</div>
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("Passwords")}}><Image className="mr-2" width={20} height={20} src={Password} alt={"title"}/> Passwords</div>
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("Notes")}}><Image className="mr-2" width={20} height={20} src={Document} alt={"title"}/> Notes</div>
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("Credit Card")}}><Image className="mr-2" width={20} height={20} src={CreditCard} alt={"title"}/> Credit Cards</div>
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("TrashBin")}}><Image className="mr-2" width={20} height={20} src={Trash} alt={"title"}/> Trash</div>
                        <div className="mt-2 flex flex-row text-[#c7c7c7] hover:text-white" onClick={()=>{handleClick("PswGen")}}><Image className="mr-2" width={20} height={20} src={Gen} alt={"title"}/> Password Generator</div>
                    </div>
                )}
                {renderComponent()}
            </div>
        </div>
    )
}

export default SideBar
