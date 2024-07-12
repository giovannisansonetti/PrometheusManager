"use client"

import { useState } from "react"
import { FormProps } from "./Form.models"
import { useRouter } from "next/navigation"
import {Input, Button} from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const SignUp = () =>{
    const router = useRouter()

    const [formState, setFormState] = useState<FormProps>()

    const [isVisible, setIsVisible] = useState(false)
    const [isMPVisible, setIsMPVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    const toggleMPVisibility = () => setIsMPVisible(!isMPVisible);

    const [error, setError] = useState("")


    return(
        <div className="max-w-sm w-full min-h-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex justify-center items-center border-2 border-[#27272a]">
            <form className="flex flex-col justify-center p-7 rounded-lg mb-4 text-white">
                    <h1 className="flex justify-center text-[28px]">Register</h1>
                    <Input type="email" label="Email" className="mt-6 w-full" size="sm" onValueChange={(value) => { setFormState(f => ({ ...f, email: value})) }} />
                    <Input
                        label="Master Password"
                        size="sm"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="mt-4"
                        isRequired
                        onValueChange={(value) => {
                            setFormState(f => ({ ...f, masterPass: value }))
                          }}
                    />
                    <Input
                        label="Repeat Master Password"
                        size="sm"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleMPVisibility}>
                            {isMPVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                            </button>
                        }
                        type={isMPVisible ? "text" : "password"}
                        className="mt-4"
                        onValueChange={(value) => {
                            setFormState(f => ({ ...f, repeatPass: value }))
                          }}
                    />
                    <Input type="text" label="Phone number (2FA)" className="mt-4" size="sm" onValueChange={(value) => {
                            setFormState(f => ({ ...f, phoneNumber: value }))
                          }}/>
                    <Button className="max-w-sm mt-4" color="primary" href="/signup" variant="flat">
                        Sign Up
                    </Button>
                </form>
        </div>
    )
}

export default SignUp