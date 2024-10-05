import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import AlertEvent from "../../Events/Alerts/Alert";
import { useState } from "react";
import axios from "axios";
import { type AddNotesProps } from "../interfaces/AddItem.models";
import { type ModalProps } from "../interfaces/Modal.models";
import {
  type InsertNotesRequest,
  type GenericApiResponse,
} from "~/interfaces/api.models";
import { useSWRConfig } from "swr";

const ModalNote = ({ isOpen, onOpenChange, onClose }: ModalProps) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [noteForm, setNoteForm] = useState<AddNotesProps>({
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
    const request: InsertNotesRequest = {
      title: noteForm.title,
      description: noteForm.description,
    };
    const req = axios.post<GenericApiResponse>(
      "/api/data/insertNotes",
      request,
    );

    const response = (await req).data;

    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        void mutate("/api/data/showNotes");
        onClose();
        setSuccess(false);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
    >
      <ModalContent>
        {() => (
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
  );
};

export default ModalNote;
