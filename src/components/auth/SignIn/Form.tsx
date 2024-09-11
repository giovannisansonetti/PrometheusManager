"use client"

import { useState } from "react"
import { FormProps } from "./Form.models"
import { redirect, useRouter } from "next/navigation"
import { Input, Button } from "@nextui-org/react"
import { signIn } from "~/server/auth/signin"
import Alert from '@mui/material/Alert'
import axios from "axios"

const Login = () => {

    const router = useRouter()

    const [form, setForm] = useState<FormProps>({
        email: "",
        masterPass: ""
    })

    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        if (!form.email || !form.masterPass) {
            setError("Both fields are required")
            return
        }
        const req = axios.post("/api/auth/signin", { 
            email: form.email,
            masterPass: form.masterPass,
        })

        const response = (await req).data

        if(response.error){
            setError(response.message)
        }
        
        if(response.success){
            router.refresh()
        }
    }

    return  (
        <div className="max-w-sm w-full min-h-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col justify-center items-center border-2 border-[#27272a]">
            {error && (
                <div className="w-3/4 flex justify-center mt-10">
                    <Alert variant="outlined" severity="error" className="w-full text-center">
                        {error}
                    </Alert>
                </div>
            )}
            <form className="flex flex-col justify-center p-7 rounded-lg mb-4 text-white max-w-md">
                <h1 className="flex justify-center text-[28px]">Login</h1>
                <Input isRequired type="email" label="Email" className="mt-6 w-full" size="sm" onValueChange={(value) => (
                        setForm(f=> ({...f, email: value})) 
                    )}/>
                <Input
                    type="password"
                    isRequired
                    label="Master Password"
                    size="sm"
                    className="mt-4 w-full"
                    onValueChange={(value) => (
                        setForm(f=> ({...f, masterPass: value}))
                    )}
                />
                <Button className="w-full mt-4" color="primary" href="" variant="flat" onClick={async() =>{handleLogin()}}>
                    Login
                </Button>
                <div className="flex justify-center mt-5 gap-1 text-[#71717a]">Don't have an account? <a className="" href={"/auth/signup"}>Sign up</a></div>
            </form>
        </div>
    );
};

export default Login;   