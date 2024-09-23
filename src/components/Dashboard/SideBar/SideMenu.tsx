"use client";

import { Sidebar } from "flowbite-react";
import SideMenuItem from "./SideMenuItem";
import AllItemsLogo from "~/../public/SideBar/allitems.svg";
import { useState } from "react";
import DisplayData from "../Data/DisplayData";

import CreditCard from "~/../public/SideBar/CreditCard.svg";
import Document from "~/../public/SideBar/Document.svg";
import Password from "~/../public/SideBar/Password.svg";
import Settings from "~/../public/SideBar/Settings.svg";
import Trash from "~/../public/SideBar/Trash.svg";
import Gen from "~/../public/SideBar/Gen.svg";
import HealthCheck from "~/../public/SideBar/HealthCheck.svg";
import Image from "next/image";
import { SideMenuProps } from "./SideMenu.models";
import useBackButtonStore from "../DynamicActionButton/DynamicActionButtonStore";
import User from "~/../public/SideBar/person-circle.svg";

const SideBar = ({ active, setActive, isOpen }: SideMenuProps) => {
  const { goBack, setGoBack } = useBackButtonStore();
  const handleClick = (component: string) => {
    setActive(component);
    setGoBack(false);
  };
  return (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        className="hidden flex-col overflow-x-hidden text-ellipsis rounded-lg bg-[#161616] sm:p-4 lg:block lg:w-1/6 lg:overflow-hidden lg:whitespace-nowrap lg:p-3 lg:text-center"
      >
        <div className="flex w-full border-1 border-[#27272a] lg:mt-[26%]" />
        <Sidebar.Items className="p-3">
          <Sidebar.ItemGroup>
            <SideMenuItem
              icon={AllItemsLogo}
              isActive={active === "AllItems"}
              onClick={() => {
                handleClick("AllItems");
              }}
              name="All items"
            />
            <SideMenuItem
              icon={Password}
              isActive={active === "Passwords"}
              onClick={() => {
                handleClick("Passwords");
              }}
              name="Passwords"
            />
            <SideMenuItem
              icon={Document}
              isActive={active === "Notes"}
              onClick={() => {
                handleClick("Notes");
              }}
              name="Secure Notes"
            />
            <SideMenuItem
              icon={CreditCard}
              isActive={active === "CreditCards"}
              onClick={() => {
                handleClick("CreditCards");
              }}
              name="Credit Cards"
            />
            <SideMenuItem
              icon={Trash}
              isActive={active === "TrashBin"}
              onClick={() => {
                handleClick("TrashBin");
              }}
              name="Trash"
            />
            <SideMenuItem
              icon={Gen}
              isActive={active === "PswGen"}
              onClick={() => {
                handleClick("PswGen");
              }}
              name="Password Gen"
            />
            <SideMenuItem
              icon={HealthCheck}
              isActive={active === "PswHealthCheck"}
              onClick={() => {
                handleClick("PswHealthCheck");
              }}
              name="Health Check"
            />
            <Sidebar.Item className="absolute bottom-3 flex items-center rounded-lg border-1 p-3">
              <div className="flex-row">
                sesso anomalo
                <Image
                  src={User}
                  width={40}
                  height={35}
                  alt="Userprof"
                  className=""
                />
                <Image src={User} width={40} height={35} alt="" />
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default SideBar;
