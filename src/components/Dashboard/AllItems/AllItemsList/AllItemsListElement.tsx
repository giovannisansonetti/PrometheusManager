import Image from "next/image";
import { AllItemsListProps } from "./interfaces/AllItemsListProps";
import { fetchImage } from "~/server/fetchImg/fetchimg";

const AllItemsListElement = (item: AllItemsListProps) => {
  return (
    <div className="w-[80%] h-20 ml-[12%] top-5 border-1 border-[#27272a] rounded-md flex flex-row relative text-white mb-4 cursor-pointer" onClick={item.onClick}>
      <div className="flex items-center ml-4">
        <div className="w-8">
          {item.ItemsListType === "data" && <Image src={fetchImage(item.link)} width={32} height={32} alt={"icon"} />}
          {item.ItemsListType === "notes" && <Image src={item.image} width={32} height={32} alt={"icon"} />}
        </div>
      </div>
      <div className="flex flex-col justify-center ml-5">
        <div className="font-bold">
          {item.title}
        </div>
        {item.ItemsListType === "data" && (
          <>
            <div className="font-bold">
              {item.title}
            </div>
            <div>
              {item.email}
            </div>
          </>
        )}
      </div>
      {item.ItemsListType === "notes" && <div>{item.title}</div>}
      <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:items-center sm:h-full">
        {item.date}
      </div>
    </div>
  );
};

export default AllItemsListElement;
