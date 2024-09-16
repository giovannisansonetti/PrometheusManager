export interface PaymentCard {
  // type for the SWR request
  PAN: string;
  expiry: string;
  CVV: string;
  cardholder: string;
  createdAt: string;
  updatedAt: string;
}
