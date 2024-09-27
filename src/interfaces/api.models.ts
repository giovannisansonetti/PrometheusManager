import { type CardType } from "@prisma/client";

export interface GenericApiResponse {
  success: boolean;
  message: string;
}

//api/auth/signout
export interface SuccessfulSignOutResponse {
  success: boolean;
}

export interface FailedSignOutResponse {
  message: string;
}

//api/data/insertNotes
export interface InsertNotesRequest {
  title: string;
  description: string;
}

//api/data/insertData
export interface InsertDataRequest {
  title: string;
  webSiteLink: string;
  username: string;
  password: string;
  notes: string;
}

//api/data/insertCard
export interface InsertCardRequest {
  PAN: string;
  expiry: string;
  CVV: string;
  cardholder: string;
  type: CardType;
}
