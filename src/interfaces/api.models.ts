import { type CardType } from "@prisma/client";

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

export interface InsertCardResponse {
  message: string;
  error: boolean;
}

//api/data/manageData/restoreAll
export interface RestoreAllResponse {
  success: boolean;
  message: string;
}

export interface GenericApiResponse {
  success: boolean;
  message: string;
}
