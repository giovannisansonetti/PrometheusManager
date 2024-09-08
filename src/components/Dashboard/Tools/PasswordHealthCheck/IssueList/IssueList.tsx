import Image from "next/image"
import IssueListProps from "./interfaces/IssueList.models"
import { Button } from "@nextui-org/react"
import key from "~/../public/key-fill.svg" 

const handleChangePass = async(dataId: string) =>{

}

const IssueList = ({type, data} : IssueListProps) =>{
    return(
        <>
            { type === "weakPasswords" && (
                <div className="w-3/4 h-20 border-1 border-[#27272a] rounded-md flex justify-between text-white items-center">
                    <div className="flex flex-row">
                        <Image src={key} width={35} height={40} alt="password" className="ml-4"></Image>
                        <div className="flex flex-col ml-3">
                            <div className="">ID {(data?.id)}</div>
                            <div className="">Password {(data?.password)}</div>
                        </div>
                    </div>
                    <Button variant="flat" color="primary" className="mr-4" onPress={()=>{/*Handle the password change*/}}>Change password</Button>
                </div>
            )}

            { type === "reusedPasswords" && (
                <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">

                </div>
            )}

            { type === "oldPasswords" && (
                <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">
                    
                </div>
            )}
        </>
    )
}

export default IssueList