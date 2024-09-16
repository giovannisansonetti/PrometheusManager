export enum PageType {
  ALLITEMS,
  NOTE,
  PASSWORD,
  CREDITCARD,
}

export interface DynamicActionButtonProps {
  onButtonClick?: () => void;
  buttonText?: string;
  onNoteModalOpen: () => void;
  onPasswordModalOpen: () => void;
  pageType: PageType;
}
