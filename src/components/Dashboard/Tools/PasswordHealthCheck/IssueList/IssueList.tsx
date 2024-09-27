import Image from "next/image";
import type IssueListProps from "./interfaces/IssueList.models";
import { Button } from "@nextui-org/react";
import key from "~/../public/key-fill.svg";

const IssueList = ({ type, data }: IssueListProps) => {
  return (
    <>
      {type === "weakPasswords" && (
        <div className="flex h-20 w-3/4 items-center justify-between rounded-md border-1 border-[#27272a] text-white">
          <div className="flex flex-row">
            <Image
              src={key as string}
              width={35}
              height={40}
              alt="password"
              className="ml-4"
            ></Image>
            <div className="ml-3 flex flex-col">
              <div className="">ID {data?.id}</div>
              <div className="">Password {data?.password}</div>
            </div>
          </div>
          <Button
            variant="flat"
            color="primary"
            className="mr-4"
            onPress={() => {
              /*Handle the password change*/
            }}
          >
            Change password
          </Button>
        </div>
      )}

      {type === "reusedPasswords" && (
        <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white sm:rounded-lg lg:items-center"></div>
      )}

      {type === "oldPasswords" && (
        <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white sm:rounded-lg lg:items-center"></div>
      )}
    </>
  );
};

export default IssueList;
