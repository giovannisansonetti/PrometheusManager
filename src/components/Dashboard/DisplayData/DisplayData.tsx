"use client";

import { DisplayDataProps } from "./interfaces/DisplayData.models";
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
import { type AddItemsProps } from "./interfaces/AddItem.models";
import { useRouter } from "next/navigation";
import DataList from "./DataItemList/DataList";
import AlertEvent from "~/components/Events/Alerts/Alert";
import axios from "axios";
import DynamicActionButton from "../DynamicActionButton/DynamicActionButton";
import { PageType } from "../DynamicActionButton/interfaces/DynamicActionButton.models";
import BurgerMenu from "../Burger/BurgerMenu";

const DisplayData = ({ handleMenu, isOpen }: DisplayDataProps) => {
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onOpenChange: onPasswordModalOpenChange,
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
      location.reload();
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full lg:hidden">
            <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
          </div>
          <DynamicActionButton
            onButtonClick={onPasswordModalOpen}
            buttonText="Add data"
            pageType={PageType.PASSWORD}
          ></DynamicActionButton>
        </div>

        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <DataList />

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
    </div>
  );
};

export default DisplayData;
