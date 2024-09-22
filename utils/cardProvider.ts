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

  if (value[0] === "2" || value[0] === "5") {
    return cardProv.MASTERCARD;
  } else if (value[0] === "4") {
    return cardProv.VISA;
  } else if (value[0] === "3") {
    return cardProv.AMERICANEXPRESS;
  } else {
    return cardProv.UNKNOWN;
  }
};

export const getCardImage = (PAN: string) => {
  const provider = checkCardProvider(PAN);
  switch (provider) {
    case cardProv.VISA:
      return Visa;
    case cardProv.MASTERCARD:
      return MasterCard;
    case cardProv.AMERICANEXPRESS:
      return AmericanExpress;
    default:
      return CreditCard;
  }
};
