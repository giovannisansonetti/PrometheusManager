"use client"

import { useState } from "react"
import { FormProps } from "./Form.models"
import { useRouter } from "next/navigation"
import {Input, Button} from "@nextui-org/react";

const SignUp = async() =>{
    const router = useRouter()
    const [formState, setFormState] = useState<FormProps>()

    return(
        <div className="flex justify-center">
            <div className="w-[90%] sm:w-[25%] sm:min-w-[30px] h-[70%] mx-auto bg-[#1c1f20] w-15 absolute top-[15%] flex-col border-2 border-[#1545af] rounded-2xl ml-auto mr-auto flex">                
            <h1 className="text-white text-[24px] font-bold mt-8">SIGN UP</h1>
            <Input type="email"></Input>
            <Button color="primary">
                Button
            </Button>
            </div>
        </div>
    )
}

export default SignUp