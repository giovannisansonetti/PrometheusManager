"use client"
import { useState } from "react"
import SideBar from "./SideBar/SideMenu"
import DisplayData from "./DisplayData/DisplayData"

const UserDashboard = () => {

    const [active, setActive] = useState("AllItems")

    const [isOpen, setIsOpen] = useState(false)

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

    const handleMenu = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex h-screen sm:p-3 ">
            <SideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen}/>
            {renderComponent()}
        </div>
        
    )
}

export default UserDashboard