import { useEffect, useState } from "react"
import fetchHealthCheck from "~/server/data/healthCheck/healthCheck"
import Image from "next/image"
import arrow from "~/../public/arrow-right-short.svg"
import { IconBxXCircle } from "public/IconBxXCircle"
import { IconIonCopy } from "public/IconIonCopy"
import { IconBxTime } from "public/IconBxTime"

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
    const [healthCheckItems, setHealthCheckItems] = useState<HealthCheck | null>(null) 

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

    return(
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto items-center">
            <div className="w-full flex items-center justify-between p-4 sm:hidden">
                <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </button>
            </div>    

            <h1 className="text-[20px] mt-4 sm:text-[30px] flex justify-center">
                Password Health Check
            </h1>

            <div className="flex w-full mt-5 border-1 border-[#27272a]"></div>
            { healthCheckItems ? (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-5">

                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer">
                    {healthCheckItems.weakPassword > 0 ? (
                        <div className="justify-start ml-7">
                            <div className="flex-col">
                                <div className="flex flex-row"><IconBxXCircle height={"40px"}/><h1 className="text-[25px] ml-2">Weak passwords(s) found</h1></div>
                                <div className="sm:text-[35px] sm:mt-5 ml-2 flex flex-row">{healthCheckItems.weakPassword}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="justify-start ml-7">
                            <div className="flex-col">
                                <IconBxXCircle />
                                <h1 className="text-[20px]">Weak passwords(s) found</h1>
                                <div className="sm:text-[35px] sm:mt-5">0</div>
                            </div>
                        </div>
                    )}
                    <Image width={"40"} height={"40"} src={arrow} alt="" className="cursor-pointer flex justify-end mr-2"></Image>
                </div>

                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer">
                    {healthCheckItems.reusedPasswords && healthCheckItems.reusedPasswords.length > 0 ? (
                            <div className="justify-start ml-7">
                                <div className="flex-col">
                                    <div className="flex flex-row"><IconIonCopy height={"35px"}/><h1 className="text-[25px] ml-2">Reused passwords(s) found</h1></div>
                                    <div className="sm:text-[35px] sm:mt-5 ml-2 flex flex-row">{healthCheckItems.reusedPasswords.length}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="justify-start ml-7">
                                <div className="flex-col">
                                    <div className="flex flex-row"><IconIonCopy height={"35px"}/><h1 className="text-[25px] ml-2">Reused passwords(s) found</h1></div>
                                    <div className="sm:text-[35px] sm:mt-5 ml-2 flex flex-row">0</div>
                                </div>
                            </div>
                        )}
                        <Image width={"40"} height={"40"}
                            src={arrow}
                            alt=""
                            className="cursor-pointer flex justify-end mr-2"
                        />
                </div>

                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer">
                    {healthCheckItems.oldPassword > 0 ?(
                        <div className="justify-start ml-7">
                                    <div className="flex-col">
                                        <div className="flex flex-row"><IconBxTime height={"35px"}/><h1 className="text-[25px] ml-2">Old password(s) found</h1></div>
                                        <div className="sm:text-[35px] sm:mt-5 ml-2 flex flex-row">{healthCheckItems.oldPassword}</div>
                                    </div>
                                </div>
                        ) : (
                            <div className="justify-start ml-7">
                                <div className="flex-col">
                                    <div className="flex flex-row"><IconBxTime height={"35px"}/><h1 className="text-[25px] ml-2">Old passwords(s) found</h1></div>
                                    <div className="sm:text-[35px] sm:mt-5 ml-2 flex flex-row">0</div>
                                </div>
                            </div>)
                    }
                    <Image width={"40"} height={"40"} src={arrow} alt="" className="cursor-pointer flex justify-end mr-2"></Image>
                </div>

                </div>
                ) :
                (
                    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
                        Couldn't fetch data
                    </div>
                )}
        </div>
    )
}

export default PswHealthCheck