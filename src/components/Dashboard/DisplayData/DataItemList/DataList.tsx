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
import ShowData from "./ShowData/ShowData";

const DataList = () => {
  type ViewState = "overview" | "password";

  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/showData",
    fetcher,
  );
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [selectData, setSelectData] = useState<Data | null>(null);
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentView, setCurrentView] = useState<ViewState>("overview");

  const handleClick = (data: Data) => {
    setSelectData(data);
    setCurrentView("password");
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
    return <div>Error loading data</div>;
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

  const renderData = () => {
    if (currentView === "password" && selectData && selectData.notes) {
      return (
        <ShowData
          id={selectData.id}
          title={selectData.title}
          webSiteLink={selectData.webSiteLink}
          username={selectData.username}
          password={selectData.password}
          passwordSecurity={selectData.passwordSecurity}
          notes={selectData.notes}
        />
      );
    }
  };

  return (
    <>
      {currentView === "overview" && data && data.data ? (
        <div className="ml-auto mr-auto h-full w-full overflow-auto overflow-x-hidden">
          {data.data.map((item) => {
            return (
              <div key={item.id}>
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
        </div>
      ) : (
        <div className="flex items-center justify-center">{renderData()}</div>
      )}
    </>
  );
};

export default DataList;
