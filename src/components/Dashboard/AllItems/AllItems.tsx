"use client";

import {
  type AddItemsProps,
  type AddNotesProps,
} from "./interfaces/AddItem.models";
import { useState } from "react";
import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AddNoteProps } from "../DisplayNotes/interfaces/AddNote.models";
import AllItemsList from "./AllItemsList/AllItemsList";
import { DisplayItemsProps } from "./interfaces/DisplayData.models";
import AlertEvent from "~/components/Events/Alerts/Alert";
import { useRouter } from "next/navigation";
import axios from "axios";

const AllItems = ({ handleMenu, isOpen }: DisplayItemsProps) => {
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onOpenChange: onPasswordModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onOpenChange: onNoteModalOpenChange,
  } = useDisclosure();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [dataform, setDataForm] = useState<AddItemsProps>({
    title: "",
    webSiteLink: "",
    username: "",
    password: "",
    notes: "",
  });

  const [noteForm, setNoteForm] = useState<AddNoteProps>({
    title: "",
    description: "",
  });

  const handlePasswordClick = async (onClose: () => void) => {
    if (
      !dataform.title ||
      !dataform.webSiteLink ||
      !dataform.username ||
      !dataform.password
    ) {
      setError(true);
      setMessage("Fill all the fields");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
      return;
    }

    setLoading(true);
    const req = axios.post("/api/data/insertData", {
      title: dataform.title,
      webSiteLink: dataform.webSiteLink,
      username: dataform.username,
      password: dataform.password,
      notes: dataform.notes,
    });
    const response = (await req).data;
    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setLoading(false);
      }, 1000);
      router.refresh();
    }
  };

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
          <div className="block w-full lg:hidden">
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
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <AllItemsList />

      <Modal
        isOpen={isPasswordModalOpen}
        onOpenChange={onPasswordModalOpenChange}
        className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {error && (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="error"
                    description={message}
                    className="mt-3 w-2/4"
                  />
                </div>
              )}

              {success && (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="success"
                    description={"item correctly added"}
                    className="mt-3 w-2/4"
                  />
                </div>
              )}

              <ModalHeader className="mt-2 flex flex-col gap-1">
                Add an item
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Title"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, title: value }));
                  }}
                />
                <Input
                  isRequired
                  label="Website"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, webSiteLink: value }));
                  }}
                />
                <Input
                  isRequired
                  label="Email"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, username: value }));
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, password: value }));
                  }}
                />
                <Textarea
                  label="Notes"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, notes: value }));
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
                      await handlePasswordClick(onClose);
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

export default AllItems;
