import { PaymentCard } from "@prisma/client";

export interface CardListProps {
  PAN: string;
  expiry: string;
  CVV: string;
  cardholder: string;
  type: CardType;
}

enum CardType {
  CREDIT,
  DEBIT,
}

export type ApiResponse = {
  status: number;
  message?: string;
  error?: boolean;
  data?: PaymentCard[];
};
