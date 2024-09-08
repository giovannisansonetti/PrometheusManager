import Image from "next/image"
import { AllItems } from "~/server/data/showdata/allitems.models"
import { fetchImage } from "~/server/fetchImg/fetchimg"
import NoteIcon from "~/../public/SideBar/Document.svg"

interface AllItemsListElementProps {
  item: AllItems
  date: string
  onClick?: () => void 
}

const AllItemsListElement = ({ item, date, onClick }: AllItemsListElementProps) => {
  return (
    <div>
    {!item.isDeleted && (
      <div className="w-[80%] h-20 ml-[12%] top-5 border-1 border-[#27272a] rounded-md flex flex-row relative text-white mb-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-center ml-4">
          <div className="w-8">
            {item.type === "data" && (
              <Image src={fetchImage(item.webSiteLink)} width={32} height={32} alt="icon" />
            )}
            {item.type === "note" && <Image src={NoteIcon} width={32} height={32} alt="icon" />}
          </div>
        </div>
        {item.type === "data" && (
          <div className="flex flex-col justify-center ml-5">
            <div className="font-bold">{item.title}</div>
            <div className="hidden sm:flex">{item.username}</div>
          </div>
        )}
        {item.type === "note" && (
          <div className="flex flex-col justify-center ml-5">
            <div className="font-bold">{item.noteTitle}</div>
          </div>
        )}
        <div className="hidden sm:absolute sm:left-[50%] sm:flex sm:items-center sm:h-full">{date}</div>
      </div>
    )}
    </div>
  )
}

export default AllItemsListElement
