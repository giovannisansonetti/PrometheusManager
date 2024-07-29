"use client"
import { useState } from "react"
import SideBar from "./SideBar/SideMenu"
import DisplayData from "./DisplayData/DisplayData"
import MobileSideBar from "./SideBar/MobileSideBar"
import DisplayNotes from "./DisplayNotes/DisplayNotes"
import AllItems from "./AllItems/AllItems"

const UserDashboard = () => {

    const [active, setActive] = useState("AllItems")

    const [isOpen, setIsOpen] = useState(false)

    const renderComponent = () => {
        switch (active) {
            case "AllItems":
                return <AllItems handleMenu={handleMenu} isOpen={isOpen} />
            case "Passwords":
                return <DisplayData handleMenu={handleMenu} isOpen={isOpen} />
            case "Notes":
                return <DisplayNotes handleMenu={handleMenu} isOpen={isOpen} />
            case "CreditCards":
            case "TrashBin":
                return
            case "PswGen":
            default:
                return null;
        }
    }

    const handleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex h-screen sm:p-3 ">
            <SideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-grow sm:p-3">
                <MobileSideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen}></MobileSideBar>
                {renderComponent()}
            </div>
        </div>

    )
}

export default UserDashboard