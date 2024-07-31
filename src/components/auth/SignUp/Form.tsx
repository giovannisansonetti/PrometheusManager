"use client"

import { useState } from "react"
import { FormProps } from "./Form.models"
import { useRouter } from "next/navigation"
import {Input, Button} from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { signup } from "~/server/auth/signup";
import Link from "next/link";
import Alert from '@mui/material/Alert'

const SignUp = () =>{
    const router = useRouter()

    const [form, setForm] = useState<FormProps>({
        email: '',
        masterPass: '',
        repeatPass: '',
        phoneNumber: ''
    })

    const handleSignUp = async () => {
        const req = await signup(form)
        if(req){
            const response = JSON.parse(req)
            if (response.error) {
                setError(response.error);
            } else {
                setError(null);
            }
        }
    }

    const [isVisible, setIsVisible] = useState(false)
    const [isMPVisible, setIsMPVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    const toggleMPVisibility = () => setIsMPVisible(!isMPVisible);

    const [error, setError] = useState<string | null>(null)



    return(
        <div className="max-w-sm w-full min-h-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col justify-center items-center border-2 border-[#27272a]">
            {error && (
                <div className="w-3/4 flex justify-center mt-5">
                    <Alert variant="outlined" severity="error" className="w-full text-center">
                        {error}
                    </Alert>
                </div>
            )}
            <form className="flex flex-col justify-center p-5 rounded-lg mb-4 text-white">
                    <h1 className="flex justify-center text-[28px]">Register</h1>
                    <Input isRequired type="email" label="Email" className="mt-6 w-full" size="sm" onValueChange={(value) => {
                        setForm(f => ({...f, email: value}))
                    }}/>
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
                            setForm(f => ({...f, masterPass: value}))}}
                    />
                    <Input
                        isRequired
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
                            setForm(f => ({...f, repeatPass: value}))
                          }}
                    />
                    <Input isRequired type="text" label="Phone number (2FA)" className="mt-4" size="sm" onValueChange={(value) => {
                            setForm(f =>({...f, phoneNumber: value}))
                          }}/>
                    <Button className="max-w-sm mt-4" color="primary" href="/signup" variant="flat" onClick={async() => {handleSignUp()}}>
                        Sign Up
                    </Button>
                    <div className="flex justify-center mt-3 gap-1 text-[#71717a]">Already a member? <Link className="" href={"/auth/login"}>Login</Link></div>
                </form>
        </div>
    )
}

export default SignUp