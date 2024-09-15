import { useState } from "react";
import { DisplayCardsProps } from "./interfaces/DisplayCards.models";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";
import { AddCard, cardProv } from "./interfaces/AddCard.models";
import AlertEvent from "~/components/Events/Alerts/Alert";
import CreditCard from "~/../public/SideBar/CreditCard.svg";
import Visa from "~/../public/128px-Visa_Inc._logo.svg.png";
import MasterCard from "~/../public/mc_symbol.svg";
import AmericanExpress from "~/../public/american-express.svg";
import Image from "next/image";
import { CardType } from "./interfaces/AddCard.models";
import validateCardNumber from "utils/cardValidator";
import axios from "axios";

const DisplayCards = ({ handleMenu, isOpen }: DisplayCardsProps) => {
  const {
    isOpen: isCardsModalOpen,
    onOpen: onCardsModalOpen,
    onOpenChange: onCardsModalOpenChange,
  } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [cardProvider, setCardProvider] = useState<cardProv>(cardProv.UNKNOWN);

  const [cardForm, setCardForm] = useState<AddCard>({
    PAN: "",
    expiry: "",
    CVV: "",
    cardholder: "",
    type: CardType.CREDIT, // default value
  });

  const handleCard = async (onClose: () => void) => {
    if (
      !cardForm.PAN ||
      !cardForm.expiry ||
      !cardForm.CVV ||
      !cardForm.cardholder
    ) {
      setError(true);
      setMessage("Fill all fields");
      return;
    }

    if (cardForm.PAN.length < 15 && cardProvider === cardProv.UNKNOWN) {
      setError(true);
      setMessage("Insert a valid card number");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    setLoading(true);

    const req = axios.post("/api/data/insertCard", {
      PAN: cardForm.PAN,
      expiry: cardForm.expiry,
      CVV: cardForm.CVV,
      cardholder: cardForm.cardholder,
      type: cardForm.type,
    });
    const response = (await req).data;
    setSuccess(true);
    setTimeout(() => {
      onClose();
      setSuccess(false);
      setLoading(false);
    }, 1500);

    if (response.error) {
      setLoading(false);
      setError(true);
      setMessage(response.message);
      return;
    }
  };

  const checkCardProvider = (value: string) => {
    if (!validateCardNumber(value)) {
      setCardProvider(cardProv.UNKNOWN);
      return;
    }

    if (value[0] === "2" || value[0] === "5") {
      setCardProvider(cardProv.MASTERCARD);
    } else if (value[0] === "4") {
      setCardProvider(cardProv.VISA);
    } else if (value[0] === "3") {
      setCardProvider(cardProv.AMERICANEXPRESS);
    } else {
      setCardProvider(cardProv.UNKNOWN);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full sm:hidden">
            <button onClick={handleMenu} className="ml-5 rounded p-2">
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"}`}
              ></span>
            </button>
          </div>
          <Button color="primary" variant="flat" onClick={onCardsModalOpen}>
            Add a card
          </Button>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <Modal
        isOpen={isCardsModalOpen}
        onOpenChange={onCardsModalOpenChange}
        className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {success ? (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="success"
                    description="Card added correctly"
                    className="mt-3 w-2/4"
                  />
                </div>
              ) : null}

              {error ? (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="error"
                    description={message}
                    className="mt-3 w-2/4"
                  />
                </div>
              ) : null}

              <ModalHeader className="mt-2 flex flex-col items-center gap-1">
                {cardProvider === cardProv.MASTERCARD && (
                  <Image src={MasterCard} width={60} height={60} alt={""} />
                )}

                {cardProvider === cardProv.VISA && (
                  <Image src={Visa} width={60} height={60} alt={""} />
                )}

                {cardProvider === cardProv.AMERICANEXPRESS && (
                  <Image
                    src={AmericanExpress}
                    width={60}
                    height={60}
                    alt={""}
                  />
                )}

                {cardProvider === cardProv.UNKNOWN && (
                  <Image src={CreditCard} width={60} height={60} alt={""} />
                )}
              </ModalHeader>
              <ModalBody className="mt-3">
                <Input
                  maxLength={16}
                  type="number"
                  isRequired
                  label="Card's number"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setCardForm((props) => ({ ...props, PAN: value }));
                    checkCardProvider(value);
                  }}
                />
                <Input
                  maxLength={5}
                  isRequired
                  label="Expiry date (MM/YY)"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setCardForm((props) => ({ ...props, expiry: value }));
                  }}
                />
                <Input
                  maxLength={3}
                  isRequired
                  label="CVV"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setCardForm((props) => ({ ...props, CVV: value }));
                  }}
                />
                <Input
                  isRequired
                  label="Holder's name"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setCardForm((props) => ({ ...props, cardholder: value }));
                  }}
                />
                <Autocomplete
                  label="Card's type"
                  className="w-full"
                  onSelectionChange={(value) => {
                    setCardForm((props) => ({
                      ...props,
                      type: value as CardType,
                    }));
                  }}
                >
                  <AutocompleteItem
                    key={CardType.CREDIT}
                    value={CardType.CREDIT}
                  >
                    Credit Card
                  </AutocompleteItem>
                  <AutocompleteItem key={CardType.DEBIT} value={CardType.DEBIT}>
                    Debit Card
                  </AutocompleteItem>
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                {loading ? (
                  <Button color="primary" isLoading>
                    Adding item
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="flat"
                    onClick={async () => handleCard(onClose)}
                  >
                    Add card
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DisplayCards;
