import { Sidebar } from "flowbite-react";
import Image from "next/image";

interface SideMenuItemProps {
  name: string;
  isActive: boolean;
  icon: string;
  onClick: () => void;
}

const SideMenuItem = ({ name, isActive, icon, onClick }: SideMenuItemProps) => {
  return (
    <div
      className={`mt-2.5 flex cursor-pointer items-center rounded-lg p-2 ${isActive ? "bg-[#383737] text-white" : "hover:bg-[#292828] hover:text-white"} `}
      onClick={onClick}
    >
      <Image width={20} height={20} src={icon} alt={"title"} className="" />
      <Sidebar.Item className="hidden lg:block lg:text-ellipsis lg:whitespace-normal lg:text-[16px] lg:leading-tight">
        {name}
      </Sidebar.Item>
    </div>
  );
};

export default SideMenuItem;
