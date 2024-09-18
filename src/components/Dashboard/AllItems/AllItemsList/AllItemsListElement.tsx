import Image from "next/image";
import { AllItems } from "~/server/data/showdata/allitems.models";
import { fetchImage } from "~/server/fetchImg/fetchimg";
import NoteIcon from "~/../public/SideBar/Document.svg";
import { checkCardProvider, getCardImage } from "utils/cardProvider";
import { useEffect, useState } from "react";

interface AllItemsListElementProps {
  item: AllItems;
  date: string;
  onClick?: () => void;
}

const AllItemsListElement = ({
  item,
  date,
  onClick,
}: AllItemsListElementProps) => {
  const [maskedPan, setMaskedPan] = useState<string>();

  useEffect(() => {
    if (item.type === "paymentCard") {
      const masked = "• ".repeat(item.PAN.length - 4) + item.PAN.slice(-4);
      setMaskedPan(masked);
    }
  });

  return (
    <div>
      {!item.isDeleted && (
        <div
          className="relative top-7 mb-4 ml-[12%] flex h-20 w-[80%] cursor-pointer flex-row rounded-md border-1 border-[#27272a] text-white"
          onClick={onClick}
        >
          <div className="ml-4 flex items-center">
            <div className="w-8">
              {item.type === "data" && (
                <Image
                  src={fetchImage(item.webSiteLink)}
                  width={32}
                  height={32}
                  alt="icon"
                />
              )}
              {item.type === "note" && (
                <Image src={NoteIcon} width={32} height={32} alt="icon" />
              )}
              {item.type === "paymentCard" && (
                <Image
                  src={getCardImage(item.PAN)}
                  width={40}
                  height={40}
                  alt="icon"
                />
              )}
            </div>
          </div>
          {item.type === "data" && (
            <div className="ml-5 flex flex-col justify-center">
              <div className="font-bold">{item.title}</div>
              <div className="hidden sm:flex">{item.username}</div>
            </div>
          )}
          {item.type === "note" && (
            <div className="ml-5 flex flex-col justify-center">
              <div className="font-bold">{item.noteTitle}</div>
            </div>
          )}
          {item.type === "paymentCard" && (
            <div className="ml-5 flex flex-col justify-center">
              <div className="font-bold">{maskedPan}</div>
            </div>
          )}
          <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:h-full sm:items-center">
            {date}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllItemsListElement;
