import BackButton from "./BackButton/BackButton";
import DropdownButton from "./DropdownButton/DropdownButton";
import { DynamicActionButtonProps } from "./interfaces/DynamicActionButton.models";

const DynamicActionButton = ({
  goBack,
  backButtonClick,
  onNoteModalOpen,
  onPasswordModalOpen,
}: DynamicActionButtonProps) => {
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
