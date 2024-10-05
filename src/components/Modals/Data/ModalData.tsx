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
import { useEffect, useState } from "react";
import axios from "axios";
import { type AddItemsProps } from "../interfaces/AddItem.models";
import { type ModalProps } from "../interfaces/Modal.models";
import pswgen from "utils/pswgen";
import {
  type InsertDataRequest,
  type GenericApiResponse,
} from "~/interfaces/api.models";
import { useSWRConfig } from "swr";
import Mutate from "../SwrMutate";

const ModalData = ({ isOpen, onOpenChange, onClose }: ModalProps) => {
  const { mutate } = useSWRConfig();
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

  const handlePasswordClick = async () => {
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
    const request: InsertDataRequest = {
      title: dataform.title,
      webSiteLink: dataform.webSiteLink,
      username: dataform.username,
      password: dataform.password,
      notes: dataform.notes,
    };
    const req = axios.post<GenericApiResponse>("/api/data/insertData", request);
    const response = (await req).data;
    if (response.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        void Mutate(mutate);
        onClose();
      }, 1000);
    }
  };

  const handleGenerate = () => {
    setDataForm((props) => ({
      ...props,
      password: pswgen(32, true, true, true),
    }));
  };

  useEffect(() => {
    setDataForm((props) => ({
      ...props,
      password: pswgen(16, true, true, true),
    }));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
    >
      <ModalContent>
        {() => (
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
                label="Email or Username"
                size="sm"
                className="w-full"
                onValueChange={(value) => {
                  setDataForm((props) => ({ ...props, username: value }));
                }}
              />
              <div className="flex flex-row items-center justify-center gap-2">
                <Input
                  isRequired
                  label="Password"
                  size="sm"
                  className="w-full"
                  onValueChange={(value) => {
                    setDataForm((props) => ({ ...props, password: value }));
                  }}
                  value={dataform.password}
                />
                <Button
                  color="primary"
                  variant="flat"
                  className=""
                  onPress={() => {
                    handleGenerate();
                  }}
                >
                  Generate
                </Button>
              </div>
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
                    await handlePasswordClick();
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

export default ModalData;
