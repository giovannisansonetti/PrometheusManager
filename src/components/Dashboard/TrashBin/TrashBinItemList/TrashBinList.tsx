import { useEffect, useState } from "react";
import { AllItems, ApiResponse } from "~/server/data/showdata/allitems.models";
import TrashBinListElement from "./TrashBinListElement";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import axios from "axios";

const TrashBinList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/allitems",
    fetcher,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AllItems | null>(null);

  const handleClick = (item: AllItems) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (item: AllItems, onClose: () => void) => {
    setDeleteLoading(true);
    if (item.type === "data") {
      const body = {
        id: item.id,
        type: "data",
      };
      const req = axios.post("/api/data/manageData/deleteType", body);
      const response = (await req).data;
      if (response.success) {
        setTimeout(() => {
          onClose();
          setDeleteLoading(false);
        }, 1000);
        location.reload();
      }
    }

    if (item.type === "note") {
      const body = {
        id: item.id,
        type: "note",
      };
      const req = axios.post("/api/data/manageData/deleteType", body);
      const response = (await req).data;
      if (response.success) {
        setTimeout(() => {
          onClose();
          setDeleteLoading(false);
        }, 1000);
      }
    }
  };

  const handleRestore = async (item: AllItems, onClose: () => void) => {
    setRestoreLoading(true);
    if (item.type === "data") {
      const body = {
        id: item.id,
        type: "data",
      };
      const req = axios.post("/api/data/manageData/restoreType", body);
      const response = (await req).data;
      if (response.success) {
        setTimeout(() => {
          onClose();
          setDeleteLoading(false);
        }, 1000);
        location.reload();
      }
    }

    if (item.type === "note") {
      const body = {
        id: item.id,
        type: "note",
      };
      const req = axios.post("/api/data/manageData/restoreType", body);
      const response = (await req).data;
      if (response.success) {
        setTimeout(() => {
          onClose();
          setDeleteLoading(false);
        }, 1000);
      }
    }

    if (item.type === "paymentCard") {
      const body = {
        id: item.id,
        type: "card",
      };
      const req = axios.post("/api/data/manageData/restoreType", body);
      const response = (await req).data;
      if (response.success) {
        setTimeout(() => {
          onClose();
          setDeleteLoading(false);
        }, 1000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    );
  }

  return (
    <div>
      {data && data?.data.length ? (
        data.data.map((item) => (
          <TrashBinListElement
            key={item.id}
            item={item}
            creationDate={new Date(item.createdAt).toLocaleDateString("it-IT")}
            onClick={() => handleClick(item)}
          />
        ))
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center">
          <p className="text-gray-500">No items found</p>
        </div>
      )}

      {selectedItem && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="mt-2 flex flex-col gap-1">
                  {selectedItem.type === "data" && <>Delete or restore item</>}
                  {selectedItem.type === "note" && <>Delete or restore note</>}
                  {selectedItem.type === "paymentCard" && (
                    <>Delete or restore card</>
                  )}
                </ModalHeader>
                <ModalFooter>
                  {restoreLoading ? (
                    <Button color="primary" isLoading>
                      Restoring...
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="flat"
                      onClick={async () => {
                        await handleRestore(selectedItem, onClose);
                      }}
                    >
                      Restore
                    </Button>
                  )}
                  {deleteLoading ? (
                    <Button color="danger" isLoading>
                      Deleting...
                    </Button>
                  ) : (
                    <Button
                      color="danger"
                      variant="flat"
                      onClick={async () => {
                        await handleDelete(selectedItem, onClose);
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
      )}
    </div>
  );
};

export default TrashBinList;
