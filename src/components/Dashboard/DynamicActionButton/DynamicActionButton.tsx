import BackButton from "./BackButton/BackButton";
import DropdownButton from "./DropdownButton/DropdownButton";
import useBackButtonStore from "./DynamicActionButtonStore";
import {
  DynamicActionButtonProps,
  PageType,
} from "./interfaces/DynamicActionButton.models";

const DynamicActionButton = ({
  onNoteModalOpen,
  onPasswordModalOpen,
  pageType,
}: DynamicActionButtonProps) => {
  const { goBack, setGoBack } = useBackButtonStore();
  if (goBack) {
    return <BackButton></BackButton>;
  }
  //TODO: change the type of component based on page
  if (pageType === PageType.ALLITEMS) {
    return (
      <DropdownButton
        onNoteModalOpen={onNoteModalOpen}
        onPasswordModalOpen={onPasswordModalOpen}
      ></DropdownButton>
    );
  }
  return null;
};

export default DynamicActionButton;
