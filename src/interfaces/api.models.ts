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

//api/data/manageData/deleteType
export interface DeleteTypeRequest {
  id: string;
  type: string;
}

//api/data/moveToTrash
export interface MoveToTrashRequest {
  id: string;
  type: string;
}

//api/data/updateData
export interface UpdateDataRequest {
  title: string;
  webSiteLink: string;
  username: string;
  password: string;
  notes: string;
  id: string;
}

//api/data/updateCard
export interface UpdateCardRequest {
  PAN: string;
  expiry: string;
  cvv: string;
  cardholder: string;
  id: string;
}

//api/auth/signup
export interface SignUpRequest {
  email: string;
  masterPass: string;
  phoneNumber: string;
}

//api/auth/signin
export interface SignInRequest {
  email: string;
  masterPass: string;
}
