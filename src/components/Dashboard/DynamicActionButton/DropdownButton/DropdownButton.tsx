import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { DropdownButtonProps } from "./interfaces/DropdownButton.models";

// TODO: write this in a way that it can be used for the trash bit too
const DropdownButton = ({
  onPasswordModalOpen,
  onNoteModalOpen,
}: DropdownButtonProps) => {
  return (
    <Dropdown className="bg-[#161616]">
      <DropdownTrigger>
        <Button color="primary" variant="flat">
          Add an item
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" onClick={onPasswordModalOpen}>
          Password
        </DropdownItem>
        <DropdownItem key="copy" onClick={onNoteModalOpen}>
          Note
        </DropdownItem>
        <DropdownItem key="edit">Credit Card</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
