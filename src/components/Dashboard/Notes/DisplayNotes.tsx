import { DisplayNotesProps } from "./DisplayNotes.models";
import { Button, useDisclosure } from "@nextui-org/react";
import NotesList from "./NotesItemList/NotesList";
import BurgerMenu from "../Burger/BurgerMenu";
import ModalNote from "~/components/Modals/Data/ModalNote";

const DisplayNotes = ({ handleMenu, isOpen }: DisplayNotesProps) => {
  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onOpenChange: onNoteModalOpenChange,
  } = useDisclosure();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full lg:hidden">
            <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
          </div>
          <Button color="primary" variant="flat" onClick={onNoteModalOpen}>
            Add a Note
          </Button>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <NotesList />

      <ModalNote
        isOpen={isNoteModalOpen}
        onOpenChange={onNoteModalOpenChange}
      />
    </div>
  );
};

export default DisplayNotes;
