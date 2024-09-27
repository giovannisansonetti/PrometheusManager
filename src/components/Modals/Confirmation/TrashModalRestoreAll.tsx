import axios from "axios";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { type ModalProps } from "../interfaces/Modal.models";
import AlertEvent from "~/components/Events/Alerts/Alert";
import { type GenericApiResponse } from "~/interfaces/api.models";

const TrashModalRestoreAll = ({ isOpen, onOpenChange }: ModalProps) => {
  const [restoreLoading, setRestoreLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error] = useState<string>("");

  const handleRestoreAll = async (onClose: () => void) => {
    setRestoreLoading(true);
    const request = axios.post<GenericApiResponse>(
      "/api/data/manageData/restoreAll",
    );
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1000);
      location.reload();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {success ? (
              <div className="flex items-center justify-center">
                <AlertEvent
                  type="success"
                  description="All items have been restored"
                  className="mt-3 w-2/4"
                />
              </div>
            ) : null}

            {error ? (
              <div className="flex items-center justify-center">
                <AlertEvent
                  type="error"
                  description={error}
                  className="mt-3 w-2/4"
                />
              </div>
            ) : null}

            <ModalHeader className="mt-2 flex flex-col gap-1">
              Do you want to restore all the items?
            </ModalHeader>
            <ModalFooter>
              {restoreLoading ? (
                <Button
                  isDisabled
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Undo
                </Button>
              ) : (
                <Button color="danger" variant="flat" onPress={onClose}>
                  Undo
                </Button>
              )}
              {restoreLoading ? (
                <Button color="primary" isLoading>
                  Restoring
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="flat"
                  onClick={async () => {
                    await handleRestoreAll(onClose);
                  }}
                >
                  Restore all items
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TrashModalRestoreAll;
