import { type NotesListProps } from "../interfaces/NotesList.models";
import Image from "next/image";
import React from "react";

const NotesListItem = ({ title, image, date, onClick }: NotesListProps) => {
  return (
    <div
      className="relative top-5 mb-4 ml-[12%] flex h-20 w-[80%] cursor-pointer flex-row rounded-md border-1 border-[#27272a] text-white"
      onClick={onClick}
    >
      <div className="ml-4 flex items-center">
        <div className="w-8">
          <Image src={image} width={32} height={32} alt={"icon"} />
        </div>
      </div>
      <div className="ml-5 flex flex-col justify-center">
        <div className="font-bold">{title}</div>
      </div>
      <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:h-full sm:items-center">
        {date}
      </div>
    </div>
  );
};

export default NotesListItem;
