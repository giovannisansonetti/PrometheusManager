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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { TrashBinProps } from "./interfaces/TrashBinProps.models";
import TrashBinList from "./TrashBinItemList/TrashBinList";
import { useState } from "react";
import AlertEvent from "~/components/Events/Alerts/Alert";
import axios from "axios";
import BurgerMenu from "../Burger/BurgerMenu";

const TrashBin = ({ handleMenu, isOpen }: TrashBinProps) => {
  const {
    isOpen: isDeleteAllModalOpen,
    onOpen: onDeleteAllModalOpen,
    onOpenChange: onDeleteAllOpenChange,
  } = useDisclosure();
  const {
    isOpen: isRestoreAllModalOpen,
    onOpen: onRestoreAllModalOpen,
    onOpenChange: onRestoreAllModalOpenChange,
  } = useDisclosure();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDeleteAll = async (onClose: () => void) => {
    setDeleteLoading(true);
    const request = axios.post("/api/data/manageData/deleteAll");
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1000);
    }
  };

  const handleRestoreAll = async (onClose: () => void) => {
    setRestoreLoading(true);
    const request = axios.post("/api/data/manageData/restoreAll");
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full sm:hidden">
            <div className="block w-full lg:hidden">
              <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
            </div>
          </div>
          <Dropdown className="bg-[#161616]">
            <DropdownTrigger>
              <Button color="primary" variant="flat">
                Options
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onClick={onDeleteAllModalOpen}>
                Delete all items
              </DropdownItem>
              <DropdownItem key="copy" onClick={onRestoreAllModalOpen}>
                Restore every item
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <TrashBinList />

      <Modal
        isOpen={isDeleteAllModalOpen}
        onOpenChange={onDeleteAllOpenChange}
        className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {success ? (
                <div className="flex items-center justify-center">
                  <AlertEvent
                    type="success"
                    description="All items have been deleted"
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
                Do you want to delete all the items?
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Undo
                </Button>
                {deleteLoading ? (
                  <Button color="danger" isLoading>
                    Deleting
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={async () => {
                      handleDeleteAll(onClose);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isRestoreAllModalOpen}
        onOpenChange={onRestoreAllModalOpenChange}
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
                <Button color="primary" variant="flat" onPress={onClose}>
                  Undo
                </Button>
                {restoreLoading ? (
                  <Button color="danger" isLoading>
                    Restoring
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={async () => {
                      handleRestoreAll(onClose);
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
    </div>
  );
};

export default TrashBin;
