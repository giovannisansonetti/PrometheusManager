import BackButton from "./BackButton/BackButton";
import DropdownButton from "./DropdownButton/DropdownButton";
import useBackButtonStore from "./DynamicActionButtonStore";
import {
  DynamicActionButtonProps,
  PageType,
} from "./interfaces/DynamicActionButton.models";
import NormalButton from "./NormalButton/NormalButton";

//TODO make it so that when a button on the sidebar is clicked it also sets goback to false
const DynamicActionButton = ({
  onNoteModalOpen,
  onPasswordModalOpen,
  pageType,
  onButtonClick,
  buttonText,
}: DynamicActionButtonProps) => {
  const { goBack, setGoBack } = useBackButtonStore();
  if (goBack) {
    return <BackButton></BackButton>;
  }
  //TODO: change the type of component based on page
  if (
    pageType === PageType.ALLITEMS &&
    onNoteModalOpen &&
    onPasswordModalOpen
  ) {
    return (
      <DropdownButton
        onNoteModalOpen={onNoteModalOpen}
        onPasswordModalOpen={onPasswordModalOpen}
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
