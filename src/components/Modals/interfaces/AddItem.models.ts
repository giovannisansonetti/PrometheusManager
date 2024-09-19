export interface AddItemsProps {
  title: string;
  webSiteLink: string;
  username: string;
  password: string;
  notes: string;
}

export interface AddNotesProps {
  title: string;
  description: string;
}

export type AddCard = {
  PAN: string;
  expiry: string;
  CVV: string;
  cardholder: string;
  type: CardType;
};

export enum CardType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum cardProv {
  MASTERCARD,
  VISA,
  AMERICANEXPRESS,
  UNKNOWN,
}
