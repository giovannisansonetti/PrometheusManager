"use client";

import { useDisclosure } from "@nextui-org/react";
import AllItemsList from "./AllItemsList/AllItemsList";
import { type DisplayItemsProps } from "./interfaces/DisplayData.models";
import DynamicActionButton from "../DynamicActionButton/DynamicActionButton";
import { PageType } from "../DynamicActionButton/interfaces/DynamicActionButton.models";
import BurgerMenu from "../Burger/BurgerMenu";
import ModalData from "~/components/Modals/Data/ModalData";
import ModalNote from "~/components/Modals/Data/ModalNote";
import ModalCard from "~/components/Modals/Data/ModalCard";

const AllItems = ({ handleMenu, isOpen }: DisplayItemsProps) => {
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onOpenChange: onPasswordModalOpenChange,
    onClose: onPasswordModalClose,
  } = useDisclosure();

  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onOpenChange: onNoteModalOpenChange,
    onClose: onNoteModalClose,
  } = useDisclosure();

  const {
    isOpen: isCardModalOpen,
    onOpenChange: onCardModalOpenChange,
    onClose: onCardModalClose,
  } = useDisclosure();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full lg:hidden">
            <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
          </div>
          <DynamicActionButton
            onNoteModalOpen={onNoteModalOpen}
            onPasswordModalOpen={onPasswordModalOpen}
            onCreditCardOpen={onCardModalOpenChange}
            pageType={PageType.ALLITEMS}
          ></DynamicActionButton>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <AllItemsList />

      <ModalData
        isOpen={isPasswordModalOpen}
        onOpenChange={onPasswordModalOpenChange}
        onClose={onPasswordModalClose}
      />

      <ModalNote
        isOpen={isNoteModalOpen}
        onOpenChange={onNoteModalOpenChange}
        onClose={onNoteModalClose}
      />

      <ModalCard
        isOpen={isCardModalOpen}
        onOpenChange={onCardModalOpenChange}
        onClose={onCardModalClose}
      />
    </div>
  );
};

export default AllItems;
