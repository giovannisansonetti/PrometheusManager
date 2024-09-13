import { useEffect, useState } from "react";
import { type Data } from "./interfaces/Data";
import DataListItem from "./DataListItem";
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
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import { type ApiResponse } from "./interfaces/DataList.models";
import axios from "axios";

const DataList = () => {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/showData",
    fetcher,
  );
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [selectData, setSelectData] = useState<Data | null>(null);
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (data: Data) => {
    setSelectData(data);
    onOpen();
  };

  const handleDelete = async (id: string, onClose: () => void) => {
    setLoading(true);

    const req = {
      id: id,
      type: "data",
    };
    const request = axios.post("/api/data/moveToTrash", req);
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 1000);
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

  if (error) {
    <div>sesso</div>;
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
    <>
      {data && data.data ? (
        <div className="ml-auto mr-auto h-full w-full overflow-auto overflow-x-hidden">
          {data.data.map((item) => {
            return (
              <div>
                {!item.isDeleted && (
                  <DataListItem
                    key={item.id}
                    title={item.title}
                    link={item.webSiteLink}
                    email={item.username}
                    date={new Date(item.createdAt).toLocaleDateString("it-IT")}
                    onClick={() => handleClick(item)}
                  />
                )}
              </div>
            );
          })}

          <Modal
            isOpen={isModalOpen}
            onOpenChange={onOpenChange}
            className="bottom-[25%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <>
                    <ModalHeader className="mt-2 flex flex-col gap-1">
                      {selectData && (
                        <>
                          <h2 className="text-2xl font-bold">
                            {selectData.title}
                          </h2>
                          <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                          <p className="text-sm text-gray-500">
                            Created on:{" "}
                            {new Date(selectData.createdAt).toLocaleDateString(
                              "it-IT",
                            )}
                          </p>
                        </>
                      )}
                    </ModalHeader>
                    <ModalBody>
                      {selectData && (
                        <div className="flex flex-col gap-2">
                          <p className="text-lg font-bold">Info</p>
                          <div className="flex flex-col rounded-md shadow-sm">
                            <p className="text-md font-medium">
                              Website:{" "}
                              <span className="font-normal">
                                {selectData.webSiteLink}
                              </span>
                            </p>
                            <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                            <p className="text-md mt-2 font-medium">
                              Username:{" "}
                              <span className="font-normal">
                                {selectData.username}
                              </span>
                            </p>
                            <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                            <p className="text-md mt-2 overflow-hidden text-ellipsis font-medium">
                              Password:{" "}
                              <span className="font-normal">
                                {selectData.password}
                              </span>
                            </p>
                            <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                            <p className="text-md mt-2 font-medium">
                              Password Security:{" "}
                              <span className="font-normal">
                                {selectData.passwordSecurity}
                              </span>
                            </p>
                            <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                          </div>
                        </div>
                      )}
                    </ModalBody>
                    {selectData && (
                      <ModalFooter>
                        {loading ? (
                          <Button
                            isLoading
                            color="danger"
                            variant="flat"
                            onClick={async () => {
                              handleDelete(selectData.id, onClose);
                            }}
                          >
                            Delete data
                          </Button>
                        ) : (
                          <Button
                            color="danger"
                            variant="flat"
                            onClick={async () => {
                              handleDelete(selectData.id, onClose);
                            }}
                          >
                            Delete data
                          </Button>
                        )}
                        <Button
                          color="primary"
                          variant="flat"
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    )}
                  </>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div>No data found</div>
        </div>
      )}
    </>
  );
};

export default DataList;
