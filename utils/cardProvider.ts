import { cardProv } from "~/components/Dashboard/DisplayCards/interfaces/AddCard.models";
import validateCardNumber from "./cardValidator";

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
