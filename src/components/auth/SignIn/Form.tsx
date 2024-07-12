import { useState } from "react";
import { FormProps } from "./Form.models";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

const Login = () => {

    const [form, setForm] = useState<FormProps>({
        email: "",
        masterPass: ""
    })

    return (
        <div className="max-w-sm w-full min-h-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex justify-center items-center border-2 border-[#27272a]">
            <form className="flex flex-col justify-center p-7 rounded-lg mb-4 text-white max-w-md">
                <h1 className="flex justify-center text-[28px]">Login</h1>
                <Input type="email" label="Email" className="mt-6 w-full" size="sm" onValueChange={(value) => (
                        setForm(f=> ({...f, email: value}))
                    )}/>
                <Input
                    label="Master Password"
                    size="sm"
                    className="mt-4 w-full"
                    onValueChange={(value) => (
                        setForm(f=> ({...f, masterPass: value}))
                    )}
                />
                <Button className="w-full mt-4" color="primary" href="" variant="flat">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;   