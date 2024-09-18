import { AllItems } from "~/server/data/showdata/allitems.models";

export default interface TrashBinListElementProps {
  item: AllItems;
  creationDate?: string;
  onClick: () => void;
}
