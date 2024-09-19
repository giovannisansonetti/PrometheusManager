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
