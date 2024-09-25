export enum PageType {
  ALLITEMS,
  NOTE,
  PASSWORD,
  CREDITCARD,
}

export interface DynamicActionButtonProps {
  onButtonClick?: () => void;
  buttonText?: string;
  onNoteModalOpen?: () => void;
  onCreditCardOpen: () => void;
  onPasswordModalOpen?: () => void;
  pageType: PageType;
}
