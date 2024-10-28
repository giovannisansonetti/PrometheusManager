"use client";

import { useState } from "react";
import { type FormProps } from "./Form.models";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../Eyes/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Eyes/EyeSlashFilledIcon";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import axios from "axios";
import {
  type GenericApiResponse,
  type SignUpRequest,
} from "~/interfaces/api.models";
import argon2 from "argon2";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormProps>({
    email: "",
    masterPass: "",
    repeatPass: "",
    phoneNumber: "",
  });

  const handleSignUp = async () => {
    if (!form.email || !form.masterPass) {
      setError("Fill all the fields");
      return;
    }
    if (form.masterPass !== form.repeatPass) {
      setError("Master password is not the same");
      return;
    }

    const request: SignUpRequest = {
      email: form.email,
      masterPass: form.masterPass,
      phoneNumber: form.phoneNumber,
    };

    const req = axios.post<GenericApiResponse>("/api/auth/signup", request);

    try {
      const response = (await req).data;

      if (!response.success) {
        setError(response.message);
      }
      if (response.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Internal server error");
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isMPVisible, setIsMPVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleMPVisibility = () => setIsMPVisible(!isMPVisible);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="absolute left-1/2 top-1/2 flex min-h-[350px] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md border-2 border-[#27272a]">
      {error && (
        <div className="mt-5 flex w-3/4 justify-center">
          <Alert
            variant="outlined"
            severity="error"
            className="w-full text-center"
          >
            {error}
          </Alert>
        </div>
      )}

      <form className="mb-4 flex flex-col justify-center rounded-lg p-5 text-white">
        <h1 className="flex justify-center text-[28px]">Register</h1>
        <Input
          isRequired
          type="email"
          label="Email"
          className="mt-6 w-full"
          size="sm"
          onValueChange={(value) => {
            setForm((f) => ({ ...f, email: value }));
          }}
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
        <Input
          isRequired
          label="Repeat Master Password"
          size="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleMPVisibility}
            >
              {isMPVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isMPVisible ? "text" : "password"}
          className="mt-4"
          onValueChange={(value) => {
            setForm((f) => ({ ...f, repeatPass: value }));
          }}
        />
        <Input
          type="text"
          label="Phone number (for 2FA)"
          className="mt-4"
          size="sm"
          onValueChange={(value) => {
            setForm((f) => ({ ...f, phoneNumber: value }));
          }}
        />
        <Button
          className="mt-4 max-w-sm"
          color="primary"
          href="/signup"
          variant="flat"
          onClick={async () => {
            await handleSignUp();
          }}
        >
          Sign Up
        </Button>

        <div className="mt-3 flex justify-center gap-1 text-[#71717a]">
          Already a member?{" "}
          <Link className="" href={"/auth/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
