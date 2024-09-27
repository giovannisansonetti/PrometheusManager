"use client";

import AllItemsLogo from "~/../public/SideBar/allitems.svg";
import CreditCard from "~/../public/SideBar/CreditCard.svg";
import Document from "~/../public/SideBar/Document.svg";
import Password from "~/../public/SideBar/Password.svg";
import Trash from "~/../public/SideBar/Trash.svg";
import Gen from "~/../public/SideBar/Gen.svg";
import HealthCheck from "~/../public/SideBar/HealthCheck.svg";
import Image from "next/image";
import { type SideMenuProps } from "./SideMenu.models";

const MobileSideBar = ({ setActive, isOpen }: SideMenuProps) => {
  const handleClick = (component: string) => {
    setActive(component);
  };
  return (
    <>
      {isOpen && (
        <div className="bg-[#161616] p-5 lg:hidden">
          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("AllItems");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={AllItemsLogo as string}
              alt={"title"}
            />
            All items
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("Passwords");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={Password as string}
              alt={"title"}
            />{" "}
            Passwords
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("Notes");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={Document as string}
              alt={"title"}
            />{" "}
            Secure notes
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("CreditCards");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={CreditCard as string}
              alt={"title"}
            />{" "}
            Credit Cards
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("TrashBin");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={Trash as string}
              alt={"title"}
            />{" "}
            Trash
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("PswGen");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={Gen as string}
              alt={"title"}
            />{" "}
            Password Generator
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>

          <div
            className="mt-2 flex cursor-pointer flex-row text-[#c7c7c7] hover:text-white"
            onClick={() => {
              handleClick("PswHealthCheck");
            }}
          >
            <Image
              className="mr-2"
              width={20}
              height={20}
              src={HealthCheck as string}
              alt={"title"}
            />{" "}
            Password Health Check
          </div>
          <div className="mt-2 flex w-3/4 border-1 border-[#27272a]"></div>
        </div>
      )}
    </>
  );
};

export default MobileSideBar;
