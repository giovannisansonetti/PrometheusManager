"use client";
import { useState, useEffect } from "react";
import SideBar from "./SideBar/SideMenu";
import DisplayData from "./Data/DisplayData";
import MobileSideBar from "./SideBar/MobileSideBar";
import DisplayNotes from "./Notes/DisplayNotes";
import AllItems from "./AllItems/AllItems";
import TrashBin from "./TrashBin/TrashBin";
import PswGenerator from "./Tools/PswGenerator/PswGenerator";
import PswHealthCheck from "./Tools/PasswordHealthCheck/PswHealthCheck";
import DisplayCards from "./CreditCards/DisplayCards";
import UnlockVaultModal from "../Modals/UnlockVault/UnlockVault";
import { useDisclosure } from "@nextui-org/react";
import { store } from "~/store/vaultSlice";

const UserDashboard = () => {
  const {
    isOpen: isUnlockVaultOpen,
    onOpen: onUnlockVaultOpen,
    onOpenChange: onUnlockVaultOpenChange,
    onClose: onUnlockVaultClose,
  } = useDisclosure();

  const [active, setActive] = useState("AllItems");

  const [isOpen, setIsOpen] = useState(false);

  const key = store.getState().key;

  useEffect(() => {
    if (!key) {
      onUnlockVaultOpen();
    }
  }, [key]);

  const renderComponent = () => {
    switch (active) {
      case "AllItems":
        return <AllItems handleMenu={handleMenu} isOpen={isOpen} />;
      case "Passwords":
        return <DisplayData handleMenu={handleMenu} isOpen={isOpen} />;
      case "Notes":
        return <DisplayNotes handleMenu={handleMenu} isOpen={isOpen} />;
      case "CreditCards":
        return <DisplayCards handleMenu={handleMenu} isOpen={isOpen} />;
      case "TrashBin":
        return <TrashBin handleMenu={handleMenu} isOpen={isOpen} />;
      case "PswGen":
        return <PswGenerator handleMenu={handleMenu} isOpen={isOpen} />;
      case "PswHealthCheck":
        return <PswHealthCheck handleMenu={handleMenu} isOpen={isOpen} />;
      default:
        return null;
    }
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen lg:p-3">
      <SideBar
        active={active}
        setActive={setActive}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex-grow lg:p-3">
        <MobileSideBar
          active={active}
          setActive={setActive}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></MobileSideBar>
        {renderComponent()}
      </div>
      {!key && (
        <UnlockVaultModal
          isOpen={isUnlockVaultOpen}
          onClose={onUnlockVaultClose}
          onOpenChange={onUnlockVaultOpenChange}
        />
      )}
    </div>
  );
};

export default UserDashboard;
