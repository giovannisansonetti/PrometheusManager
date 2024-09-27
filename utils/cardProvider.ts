import { cardProv } from "~/components/Dashboard/CreditCards/interfaces/AddCard.models";
import validateCardNumber from "./cardValidator";
import CreditCard from "~/../public/SideBar/CreditCard.svg";
import Visa from "~/../public/128px-Visa_Inc._logo.svg.png";
import MasterCard from "~/../public/mc_symbol.svg";
import AmericanExpress from "~/../public/american-express.svg";

export const checkCardProvider = (value: string) => {
  if (!validateCardNumber(value)) {
    return cardProv.UNKNOWN;
  }

  if (value.startsWith("2") || value.startsWith("5")) {
    return cardProv.MASTERCARD;
  } else if (value.startsWith("4")) {
    return cardProv.VISA;
  } else if (value.startsWith("3")) {
    return cardProv.AMERICANEXPRESS;
  } else {
    return cardProv.UNKNOWN;
  }
};

export const getCardImage = (PAN: string): string => {
  const provider = checkCardProvider(PAN);
  switch (provider) {
    case cardProv.VISA:
      return Visa.src;
    case cardProv.MASTERCARD:
      return MasterCard as string;
    case cardProv.AMERICANEXPRESS:
      return AmericanExpress as string;
    default:
      return CreditCard as string;
  }
};
