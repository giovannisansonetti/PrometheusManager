import { useEffect, useState } from "react"
import fetchHealthCheck from "~/server/data/healthCheck/healthCheck"

interface PswHealthCheckProps{
    handleMenu: ()=>void
    isOpen: boolean
}

interface HealthCheck{
    weakPassword: number
    oldPassword: number
    reusedPasswords: number
}

const PswHealthCheck = ({handleMenu, isOpen}: PswHealthCheckProps) =>{
    const [healthCheckItems, setHealthCheckItems] = useState<HealthCheck | null>(null) 

    useEffect(() =>{
        const HealthCheck = async() =>{
            const healthCheck = await fetchHealthCheck()
            if(healthCheck){
                const response: HealthCheck = JSON.parse(healthCheck)
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

            <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            { healthCheckItems ? (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 rounded-lg">
                    {healthCheckItems.weakPassword} weak passwords have been found 
                </div>

                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 rounded-lg">
                    {healthCheckItems.reusedPasswords} reused passwords have been found 
                </div>

                <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 rounded-lg">
                    {healthCheckItems.oldPassword} old passwords have been found 
                </div>
            </div>) : (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
                    Couldn't fetch data
                </div>
            )}
        </div>
    )
}

export default PswHealthCheck