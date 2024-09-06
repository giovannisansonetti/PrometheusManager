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
import HealthCheck from "~/../public/SideBar/HealthCheck.svg"
import Image from "next/image"
import { SideMenuProps } from "./SideMenu.models"

const SideBar = ({ active, setActive, isOpen }: SideMenuProps) => {
    const handleClick = (component: string) => {
        setActive(component)
    }
    return (
        <>
            <Sidebar aria-label="Default sidebar example" className="lg:w-1/6 bg-[#161616] rounded-lg overflow-x-hidden flex-col hidden lg:block sm:p-4 lg:p-1">
                <div className="lg:mt-[26%] flex w-full border-1 border-[#27272a]" />
                <Sidebar.Items className="p-3">
                    <Sidebar.ItemGroup>
                        <SideMenuItem icon={AllItemsLogo} isActive={active === "AllItems"} onClick={() => { handleClick("AllItems") }} name="All items" />
                        <SideMenuItem icon={Password} isActive={active === "Passwords"} onClick={() => { handleClick("Passwords") }} name="Passwords" />
                        <SideMenuItem icon={Document} isActive={active === "Notes"} onClick={() => { handleClick("Notes") }} name="Notes" />
                        <SideMenuItem icon={CreditCard} isActive={active === "CreditCards"} onClick={() => { handleClick("CreditCards") }} name="Credit Cards" />
                        <SideMenuItem icon={Trash} isActive={active === "TrashBin"} onClick={() => { handleClick("TrashBin") }} name="Trash" />
                        <SideMenuItem icon={Gen} isActive={active === "PswGen"} onClick={() => { handleClick("PswGen") }} name="Password Gen" />
                        <SideMenuItem icon={HealthCheck} isActive={active === "PswHealthCheck"} onClick={() => { handleClick("PswHealthCheck") }} name="Health Check" />
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
                
            </Sidebar>
        </>
    )
}

export default SideBar
