import { fetchImage } from "~/server/fetchImg/fetchimg";
import { DataListProps } from "./interfaces/DataList.models";
import Image from "next/image";
import React from "react";

const DataListItem = ({
  title,
  link,
  email,
  date,
  onClick,
  onDelete,
  onModify,
}: DataListProps) => {
  return (
    <div
      className="relative top-7 mb-4 ml-[12%] flex h-20 w-[80%] cursor-pointer flex-row rounded-md border-1 border-[#27272a] text-white"
      onClick={onClick}
    >
      <div className="ml-4 flex items-center">
        <div className="w-8">
          <Image
            src={fetchImage(link)}
            width={32}
            height={32}
            alt={"icon"}
            unoptimized={true}
          />
        </div>
      </div>
      <div className="ml-5 flex flex-col justify-center">
        <div className="font-bold">{title}</div>
        <div className="hidden sm:flex">{email}</div>
      </div>
      <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:h-full sm:items-center">
        {date}
      </div>
    </div>
  );
};

export default DataListItem;
