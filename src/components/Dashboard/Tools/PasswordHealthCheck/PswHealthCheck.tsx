import { useEffect, useState } from "react"
import fetchHealthCheck from "~/server/data/healthCheck/healthCheck"
import Image from "next/image"
import arrow from "~/../public/arrow-right-short.svg"
import { IconBxXCircle } from "public/IconBxXCircle"
import { IconIonCopy } from "public/IconIonCopy"
import { IconBxTime } from "public/IconBxTime"
import IssueList from "./IssueList/IssueList"
import back from "~/../public/back-svgrepo-com.svg" 

interface PswHealthCheckProps{
    handleMenu: ()=>void
    isOpen: boolean
}

interface HealthCheck{
    weakPassword: number
    oldPassword: number
    reusedPasswords: { password: string; _count: number }[]
}

const PswHealthCheck = ({handleMenu, isOpen}: PswHealthCheckProps) =>{

    type ViewState = "overview" | "weakPasswords" | "reusedPasswords" | "oldPasswords"

    const [healthCheckItems, setHealthCheckItems] = useState<HealthCheck | null>(null) 
    const [currentView, setCurrentView] = useState<ViewState>("overview")

    useEffect(() =>{
        const HealthCheck = async() =>{
            const healthCheck = await fetchHealthCheck()
            if(healthCheck){
                const response: HealthCheck = JSON.parse(healthCheck)
                console.log(response)
                if(response){
                    setHealthCheckItems(response)
                }
            }
        }
        
        HealthCheck()
    }, [])

    const renderIssue = () =>{
        if(currentView === "weakPasswords"){
            return(
                <IssueList />
            )
        }
    }

    return(
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">
            <div className="relative w-full">
                <div className="flex justify-end items-center mt-5 mr-7">
                    {currentView === "overview" ? (
                        <div className="flex lg:hidden">
                            <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                            </button>
                        </div>
                        ) : (
                            <div className="flex">
                                <div className="ml-5 flex flex-row cursor-pointer items-center" onClick={() => setCurrentView("overview")}>
                                    <Image src={back} width={19} height={19} alt="back" />
                                    <span className="ml-1 text-[14px] sm:text-[16px]">Back</span>
                                </div>
                            </div>
                            
                    )}

                    { currentView === "overview" && (
                        <h1 className="lg:text-[30px] flex justify-center w-full">
                            Password Health Check
                        </h1>
                    )}

                    { currentView === "weakPasswords" && (
                        <h1 className="lg:text-[30px] flex justify-center w-full">
                            Weak passwords list
                        </h1>
                    )}

                    { currentView === "reusedPasswords" && (
                        <h1 className="lg:text-[30px] flex justify-center w-full">
                            Reused passwords list
                        </h1>
                    )}

                    { currentView === "oldPasswords" && (
                        <h1 className="lg:text-[30px] text-center w-full">
                            Reused passwords list
                        </h1>
                    )}
                </div>                
            </div>   

            <div className="flex w-full mt-5 border-1 border-[#27272a]"></div>

            { healthCheckItems ? (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
                { currentView === "overview" ? (
                    <>
                        <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer" onClick={() => setCurrentView("weakPasswords")}>
                            {healthCheckItems.weakPassword > 0 ? (
                                <div className="justify-start ml-7">
                                    <div className="flex-col">
                                        <div className="flex flex-row"><IconBxXCircle height={"40px"}/><h1 className="lg:text-[25px] ml-2">Weak passwords(s) found</h1></div>
                                        <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">{healthCheckItems.weakPassword}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="justify-start ml-7">
                                    <div className="flex-col">
                                        <IconBxXCircle />
                                        <h1 className="text-[20px]">Weak passwords(s) found</h1>
                                        <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">0</div>
                                    </div>
                                </div>
                            )}
                            <Image width={"40"} height={"40"} src={arrow} alt="" className="cursor-pointer flex justify-end mr-2"></Image>
                        </div>

                        <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer" onClick={() => {setCurrentView("reusedPasswords")}}>
                            {healthCheckItems.reusedPasswords && healthCheckItems.reusedPasswords.length > 0 ? (
                                    <div className="justify-start ml-7">
                                        <div className="flex-col">
                                            <div className="flex flex-row"><IconIonCopy height={"35px"}/><h1 className="lg:text-[25px] ml-2">Reused passwords(s) found</h1></div>
                                            <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">{healthCheckItems.reusedPasswords.length}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="justify-start ml-7">
                                        <div className="flex-col">
                                            <div className="flex flex-row"><IconIonCopy height={"35px"}/><h1 className="lg:text-[25px] ml-2">Reused passwords(s) found</h1></div>
                                            <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">0</div>
                                        </div>
                                    </div>
                                )}
                                <Image width={"40"} height={"40"}
                                    src={arrow}
                                    alt=""
                                    className="cursor-pointer flex justify-end mr-2"
                                />
                        </div>

                        <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer" onClick={() => {setCurrentView("oldPasswords")}} >
                            {healthCheckItems.oldPassword > 0 ?(
                                <div className="justify-start ml-7">
                                            <div className="flex-col">
                                                <div className="flex flex-row"><IconBxTime height={"35px"}/><h1 className="text-[18px] lg:text-[25px] ml-2">Old password(s) found</h1></div>
                                                <div className="text-[25px] lg:text-[35px] mt-1 sm:mt-5 ml-2 flex flex-row">{healthCheckItems.oldPassword}</div>
                                            </div>
                                        </div>
                                ) : (
                                    <div className="justify-start ml-7">
                                        <div className="flex-col">
                                            <div className="flex flex-row"><IconBxTime height={"35px"}/><h1 className="lg:text-[25px] ml-2">Old passwords(s) found</h1></div>
                                            <div className="text-[25px] lg:text-[35px] mt-3 sm:mt-5 ml-2 flex flex-row">0</div>
                                        </div>
                                    </div>)
                            }
                            <Image width={"40"} height={"40"} src={arrow} alt="" className="cursor-pointer flex justify-end mr-2"></Image>
                        </div>
                    </>
                    ) : (
                        renderIssue()
                    )}
                    </div>

                ) : (
                    <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer">
                        Couldn't fetch data
                    </div>
                    )}

        </div>
    )
}

export default PswHealthCheck