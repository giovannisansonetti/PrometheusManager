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

export interface InsertNotesResponse {
  success: boolean;
  message: string;
}

//api/data/insertData
export interface InsertDataRequest {
  title: string;
  webSiteLink: string;
  username: string;
  password: string;
  notes: string;
}

export interface InsertDataResponse {
  success: boolean;
  message: string;
}
//TODO make the api response a single type

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
