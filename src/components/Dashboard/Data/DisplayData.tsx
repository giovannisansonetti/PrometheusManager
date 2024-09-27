"use client";

import { DisplayDataProps } from "./interfaces/DisplayData.models";
import { useState } from "react";
import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { type AddItemsProps } from "./interfaces/AddItem.models";
import { useRouter } from "next/navigation";
import DataList from "./DataItemList/DataList";
import AlertEvent from "~/components/Events/Alerts/Alert";
import axios from "axios";
import DynamicActionButton from "../DynamicActionButton/DynamicActionButton";
import { PageType } from "../DynamicActionButton/interfaces/DynamicActionButton.models";
import BurgerMenu from "../Burger/BurgerMenu";
import ModalData from "~/components/Modals/Data/ModalData";

const DisplayData = ({ handleMenu, isOpen }: DisplayDataProps) => {
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onOpenChange: onPasswordModalOpenChange,
  } = useDisclosure();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full lg:hidden">
            <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
          </div>
          <DynamicActionButton
            onButtonClick={onPasswordModalOpen}
            buttonText="Add data"
            pageType={PageType.PASSWORD}
          ></DynamicActionButton>
        </div>

        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <DataList />

      <ModalData
        isOpen={isPasswordModalOpen}
        onOpenChange={onPasswordModalOpenChange}
      />
    </div>
  );
};

export default DisplayData;
