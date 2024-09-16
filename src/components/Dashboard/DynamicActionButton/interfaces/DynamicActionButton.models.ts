export enum PageType {
  ALLITEMS,
  NOTE,
  PASSWORD,
  CREDITCARD,
}

export interface DynamicActionButtonProps {
  onNoteModalOpen: () => void;
  onPasswordModalOpen: () => void;
  pageType: PageType;
}
