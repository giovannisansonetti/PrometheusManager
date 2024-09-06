import { Sidebar } from "flowbite-react";
import Image from "next/image";

interface SideMenuItemProps{
    name: string,
    isActive: boolean,
    icon: string
    onClick: () => void
}

const SideMenuItem = ({name, isActive, icon, onClick}: SideMenuItemProps) =>{
    return(
        <div className={`flex items-center p-2 rounded-lg cursor-pointer mt-2.5 ${isActive ? 'bg-[#383737] text-white' : 'hover:bg-[#292828] hover:text-white'} `} onClick={onClick}>
            <Image width={20} height={20} src={icon} alt={"title"} className=""/>
            <Sidebar.Item className="hidden lg:block lg:text-[16px] leading-tight whitespace-normal text-ellipsis">{name}</Sidebar.Item>
        </div>
    )
}

export default SideMenuItem