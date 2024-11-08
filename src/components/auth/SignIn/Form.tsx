"use client";

import { useState } from "react";
import { type FormProps } from "./Form.models";
import { Input, Button } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { EyeFilledIcon } from "~/components/Eyes/EyeFilledIcon";
import { EyeSlashFilledIcon } from "~/components/Eyes/EyeSlashFilledIcon";
import {
  type GenericApiResponse,
  type SignInRequest,
} from "~/interfaces/api.models";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<FormProps>({
    email: "",
    masterPass: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!form.email || !form.masterPass) {
      setError("Both fields are required");
      return;
    }

    setLoading(true);

    const request: SignInRequest = {
      email: form.email,
      masterPass: form.masterPass,
    };
    const req = axios.post<GenericApiResponse>("/api/auth/signin", request);

    try {
      const response = (await req).data;

      if (!response.success) {
        setError(response.message);
      }

      if (response.success) {
        location.reload();
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 flex min-h-[350px] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md border-2 border-[#27272a]">
      {error && (
        <div className="mt-10 flex w-3/4 justify-center">
          <Alert
            variant="outlined"
            severity="error"
            className="w-full text-center"
          >
            {error}
          </Alert>
        </div>
      )}
      <form className="mb-4 flex max-w-md flex-col justify-center rounded-lg p-7 text-white">
        <h1 className="flex justify-center text-[28px]">Login</h1>
        <Input
          isRequired
          type="email"
          label="Email"
          className="mt-6 w-full"
          size="sm"
          onValueChange={(value) => setForm((f) => ({ ...f, email: value }))}
        />
        <Input
          label="Master Password"
          size="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="mt-4"
          isRequired
          onValueChange={(value) => {
            setForm((f) => ({ ...f, masterPass: value }));
          }}
        />
        {loading ? (
          <Button
            className="mt-4 w-full"
            color="primary"
            href=""
            isLoading
            variant="flat"
            onClick={async () => {
              await handleLogin();
            }}
          >
            Logging
          </Button>
        ) : (
          <Button
            className="mt-4 w-full"
            color="primary"
            href=""
            variant="flat"
            onClick={async () => {
              await handleLogin();
            }}
          >
            Login
          </Button>
        )}

        <div className="mt-5 flex justify-center gap-1 text-[#71717a]">
          Don&apos;t have an account?{" "}
          <a className="" href={"/auth/signup"}>
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
