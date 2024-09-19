import { PaymentCard } from "@prisma/client";

export interface CardListProps {
  // props for the CardList element
  PAN: string;
  expiry: string;
  image: string;
  type: string;
  onClick: () => void;
}

export type ApiResponse = {
  status: number;
  message?: string;
  error?: boolean;
  data?: PaymentCard[];
};
