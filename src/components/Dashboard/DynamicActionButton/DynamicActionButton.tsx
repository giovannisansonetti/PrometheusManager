import BackButton from "./BackButton/BackButton";
import DropdownButton from "./DropdownButton/DropdownButton";
import useBackButtonStore from "./DynamicActionButtonStore";
import {
  DynamicActionButtonProps,
  PageType,
} from "./interfaces/DynamicActionButton.models";
import NormalButton from "./NormalButton/NormalButton";

const DynamicActionButton = ({
  onNoteModalOpen,
  onPasswordModalOpen,
  onCreditCardOpen,
  pageType,
  onButtonClick,
  buttonText,
}: DynamicActionButtonProps) => {
  const { goBack, setGoBack } = useBackButtonStore();
  if (goBack) {
    return <BackButton></BackButton>;
  }
  if (
    pageType === PageType.ALLITEMS &&
    onNoteModalOpen &&
    onPasswordModalOpen &&
    onCreditCardOpen
  ) {
    return (
      <DropdownButton
        onNoteModalOpen={onNoteModalOpen}
        onPasswordModalOpen={onPasswordModalOpen}
        onCreditCardOpen={onCreditCardOpen}
      ></DropdownButton>
    );
  }
  if (onButtonClick && buttonText) {
    return (
      <NormalButton onClick={onButtonClick} text={buttonText}></NormalButton>
    );
  }
  throw new Error("Invalid page type");
};

export default DynamicActionButton;
