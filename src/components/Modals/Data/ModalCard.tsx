import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import AlertEvent from "../../Events/Alerts/Alert";
import { useState } from "react";
import axios from "axios";
import { AddCard, cardProv, CardType } from "../interfaces/AddItem.models";
import { ModalProps } from "../interfaces/Modal.models";
import { checkCardProvider } from "utils/cardProvider";
import CreditCard from "~/../public/SideBar/CreditCard.svg";
import Visa from "~/../public/128px-Visa_Inc._logo.svg.png";
import MasterCard from "~/../public/mc_symbol.svg";
import AmericanExpress from "~/../public/american-express.svg";
import Image from "next/image";

const ModalCard = ({ isOpen, onOpen, onOpenChange }: ModalProps) => {
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
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const today = new Date(); //TODO: validate the date

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

    if (
      cardForm.PAN.length < 15 ||
      (cardForm.PAN.length > 16 && cardProvider === cardProv.UNKNOWN)
    ) {
      setError(true);
      setMessage("Insert a valid card number");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    if (!expiryRegex.test(cardForm.expiry)) {
      setError(true);
      setMessage("Insert a valid expiry date");
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
    location.reload();
  };

  const handleCardNumberChange = (value: string) => {
    setCardProvider(checkCardProvider(value));
  };

  const getImage = (cardProvider: cardProv) => {
    switch (cardProvider) {
      case cardProv.MASTERCARD:
        return MasterCard;
      case cardProv.VISA:
        return Visa;
      case cardProv.MASTERCARD:
        return AmericanExpress;
      default:
        return CreditCard;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
              <Image
                src={getImage(cardProvider)}
                width={60}
                height={60}
                alt={""}
              />
            </ModalHeader>
            <ModalBody className="mt-3">
              <Input
                type="number"
                isRequired
                label="Card's number"
                size="sm"
                className="w-full"
                onValueChange={(value) => {
                  setCardForm((props) => ({ ...props, PAN: value }));
                  handleCardNumberChange(value);
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
                <AutocompleteItem key={CardType.CREDIT} value={CardType.CREDIT}>
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
  );
};

export default ModalCard;
