import { useEffect, useState } from "react";
import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  user,
} from "@nextui-org/react";
import AllItemsListElement from "./AllItemsListElement";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import { AllItems, ApiResponse } from "~/server/data/showdata/allitems.models";
import axios from "axios";
import ShowData from "../../DisplayData/DataItemList/ShowData/ShowData";
import { useRouter } from "next/navigation";
import useBackButtonStore from "../../DynamicActionButton/DynamicActionButtonStore";
import ShowCard from "../../DisplayCards/ShowCard/ShowCard";
import { getCardImage } from "utils/cardProvider";

const AllItemsList = () => {
  type ViewData = "overview" | "password" | "card";
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/allitems",
    fetcher,
  );
  const router = useRouter();
  const {
    isOpen: isNoteModalOpen,
    onOpen: onNoteModalOpen,
    onOpenChange: onNoteModalOpenChange,
  } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AllItems | null>(null);
  const [currentView, setCurrentView] = useState<ViewData>("overview");
  const { goBack, setGoBack } = useBackButtonStore();

  useEffect(() => {
    if (!goBack) {
      setCurrentView("overview");
    }
  }, [goBack]);

  const handleClick = (item: AllItems) => {
    if (item.type === "data") {
      setSelectedItem(item);
      console.log(selectedItem);
      setCurrentView("password");
      setGoBack(true);
    }
    if (item.type === "note") {
      setSelectedItem(item);
      onNoteModalOpen();
    }

    if (item.type === "paymentCard") {
      setSelectedItem(item);
      setCurrentView("card");
      setGoBack(true);
    }
  };

  const handleDelete = async (
    type: string,
    id: string,
    onClose: () => void,
  ) => {
    setLoading(true);

    if (type === "note") {
      const req = {
        id: id,
        type: "note",
      };
      const request = axios.post("/api/data/moveToTrash", req);
      const response = (await request).data;

      if (response.success) {
        setTimeout(() => {
          onClose();
          setLoading(false);
        }, 1000);
      }
    }
    setLoading(false);
    location.reload();
  };

  const render = () => {
    if (
      currentView === "password" &&
      selectedItem &&
      selectedItem.type === "data"
    ) {
      return (
        <ShowData
          id={selectedItem.id}
          title={selectedItem.title}
          webSiteLink={selectedItem.webSiteLink}
          username={selectedItem.username}
          password={selectedItem.password}
          passwordSecurity={selectedItem.passwordSecurity}
          notes={selectedItem.notes || undefined}
        />
      );
    }
    if (
      currentView === "card" &&
      selectedItem &&
      selectedItem.type === "paymentCard"
    ) {
      return (
        <ShowCard
          provider={getCardImage(selectedItem.PAN)}
          id={selectedItem.id}
          PAN={selectedItem.PAN}
          expiry={selectedItem.expiry}
          cvv={selectedItem.CVV}
          cardholder={selectedItem.cardholder}
          type={selectedItem.cardType}
        />
      );
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

  if (!Array.isArray(data?.data)) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center">
        {data && data.message && (
          <p className="text-gray-500">{data.message}</p>
        )}

        {data && data.error && <p className="text-gray-500">{data.error}</p>}
      </div>
    );
  }

  return (
    <div>
      {currentView === "overview" ? (
        <div>
          {data?.data.length ? (
            data.data.map((item) => (
              <div>
                {!item.isDeleted && (
                  <AllItemsListElement
                    item={item}
                    date={new Date(item.createdAt).toLocaleDateString("it-IT")}
                    onClick={() => handleClick(item)}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center">
              {/*TODO: A small card that explains each feature when no data is found*/}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">{render()}</div>
      )}

      <Modal
        isOpen={isNoteModalOpen}
        onOpenChange={onNoteModalOpenChange}
        className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {selectedItem && selectedItem.type === "note" && (
                <>
                  <ModalHeader className="mt-2 flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">
                      {selectedItem.noteTitle}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Created on:{" "}
                      {new Date(selectedItem.createdAt).toLocaleDateString(
                        "it-IT",
                      )}
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-bold">Content</p>
                      <p className="text-sm">{selectedItem.noteDescription}</p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="flat">
                      Close
                    </Button>
                    {loading ? (
                      <Button color="danger" isLoading>
                        Deleting
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        variant="flat"
                        onClick={async () =>
                          handleDelete("note", selectedItem.id, onClose)
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllItemsList;
