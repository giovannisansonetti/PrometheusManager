import BackButton from "./BackButton/BackButton";
import DropdownButton from "./DropdownButton/DropdownButton";
import useBackButtonStore from "./DynamicActionButtonStore";
import { DynamicActionButtonProps } from "./interfaces/DynamicActionButton.models";

const DynamicActionButton = ({
  backButtonClick,
  onNoteModalOpen,
  onPasswordModalOpen,
}: DynamicActionButtonProps) => {
  const { goBack, setGoBack } = useBackButtonStore();
  if (goBack) {
    return <BackButton onClick={backButtonClick}></BackButton>;
  }
  return (
    <DropdownButton
      onNoteModalOpen={onNoteModalOpen}
      onPasswordModalOpen={onPasswordModalOpen}
    ></DropdownButton>
  );
};

export default DynamicActionButton;
