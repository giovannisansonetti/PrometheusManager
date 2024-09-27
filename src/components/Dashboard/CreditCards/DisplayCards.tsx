import { type DisplayCardsProps } from "./interfaces/DisplayCards.models";
import { useDisclosure } from "@nextui-org/react";
import BurgerMenu from "../Burger/BurgerMenu";
import CreditCardList from "./CreditCardList/CreditCardList";
import ModalCard from "~/components/Modals/Data/ModalCard";
import DynamicActionButton from "../DynamicActionButton/DynamicActionButton";
import { PageType } from "../DynamicActionButton/interfaces/DynamicActionButton.models";

const DisplayCards = ({ handleMenu, isOpen }: DisplayCardsProps) => {
  const {
    isOpen: isCardsModalOpen,
    onOpen: onCardsModalOpen,
    onOpenChange: onCardsModalOpenChange,
  } = useDisclosure();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full lg:hidden">
            <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
          </div>
          <DynamicActionButton
            pageType={PageType.CREDITCARD}
            buttonText="Add a card"
            onButtonClick={onCardsModalOpen}
          />
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <CreditCardList />

      <ModalCard
        isOpen={isCardsModalOpen}
        onOpenChange={onCardsModalOpenChange}
      />
    </div>
  );
};

export default DisplayCards;
