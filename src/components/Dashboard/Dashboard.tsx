"use client"
import { useState } from "react"
import SideBar from "./SideBar/SideMenu"
import DisplayData from "./DisplayData/DisplayData"
import MobileSideBar from "./SideBar/MobileSideBar"
import DisplayNotes from "./DisplayNotes/DisplayNotes"
import AllItems from "./AllItems/AllItems"
import TrashBin from "./TrashBin/TrashBin"
import PswGenerator from "./Tools/PswGenerator/PswGenerator"
import PswHealthCheck from "./Tools/PasswordHealthCheck/PswHealthCheck"

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
                return
            case "TrashBin":
                return <TrashBin handleMenu={handleMenu} isOpen={isOpen} />
            case "PswGen":
                return <PswGenerator handleMenu={handleMenu} isOpen={isOpen} />
            case "PswHealthCheck":
                return <PswHealthCheck handleMenu={handleMenu} isOpen={isOpen} />
            default:
                return null;
        }
    }

    const handleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex h-screen sm:p-3">
            <SideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-grow lg:p-3">
                <MobileSideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen}></MobileSideBar>
                {renderComponent()}
            </div>
        </div>

    )
}

export default UserDashboard