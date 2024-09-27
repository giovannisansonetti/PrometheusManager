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
