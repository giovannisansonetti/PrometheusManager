import { Bell } from "public/SideBar/bell";
import { SettingsIcon } from "public/SideBar/settings";
import { UserIcon } from "public/SideBar/usericon";

const UserMenu = () => {
  return (
    <div className="absolute bottom-10 flex w-[13%] flex-row rounded-lg border-2 border-[#27272a] bg-[#131314] p-3">
      <div className="flex w-full flex-row justify-between">
        <Bell className="cursor-pointer fill-white hover:fill-gray-300" />
        <div className="flex flex-row justify-end gap-2">
          <UserIcon className="cursor-pointer fill-white hover:fill-gray-300" />
          <SettingsIcon className="cursor-pointer stroke-white hover:stroke-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
