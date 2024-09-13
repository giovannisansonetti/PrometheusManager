import { useState } from "react";
import { DisplayNotesProps } from "./DisplayNotes.models";
import { AddNoteProps } from "./interfaces/AddNote.models";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Textarea,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import NotesList from "./NotesItemList/NotesList";
import AlertEvent from "~/components/Events/Alerts/Alert";
import axios from "axios";

const DisplayNotes = ({ handleMenu, isOpen }: DisplayNotesProps) => {
  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onOpenChange: onNoteModalOpenChange,
  } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [noteForm, setNoteForm] = useState<AddNoteProps>({
    title: "",
    description: "",
  });

  const handleNoteClick = async (onClose: () => void) => {
    if (!noteForm.title || !noteForm.description) {
      setError(true);
      setMessage("Fill all the fields");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
      return;
    }

    setLoading(true);
    const req = axios.post("/api/data/insertNotes", {
      title: noteForm.title,
      description: noteForm.description,
    });

    const response = (await req).data;

    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full sm:hidden">
            <button onClick={handleMenu} className="ml-5 rounded p-2">
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"}`}
              ></span>
            </button>
          </div>
          <Button color="primary" variant="flat" onClick={onNoteModalOpen}>
            Add a Note
          </Button>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <NotesList />

      <Modal
        isOpen={isNoteModalOpen}
        onOpenChange={onNoteModalOpenChange}
        className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {success ? (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="success"
                    description="Item added correctly"
                    className="mt-3 w-2/4"
                  />
                </div>
              ) : null}

              {error ? (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="error"
                    description={message}
                    className="mt-3 w-2/4"
                  />
                </div>
              ) : null}

              <ModalHeader className="mt-2 flex flex-col gap-1">
                Create a secure note
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Note title"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setNoteForm((props) => ({ ...props, title: value }));
                  }}
                />
                <Textarea
                  isRequired
                  label="Description"
                  size="sm"
                  onValueChange={(value) => {
                    setNoteForm((props) => ({ ...props, description: value }));
                  }}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                />
              </ModalBody>
              <ModalFooter>
                {loading ? (
                  <Button color="primary" isLoading>
                    Adding item
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="flat"
                    onClick={async () => {
                      await handleNoteClick(onClose);
                    }}
                  >
                    Add
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DisplayNotes;
