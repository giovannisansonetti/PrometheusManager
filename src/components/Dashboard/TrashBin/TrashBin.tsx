import {
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { type TrashBinProps } from "./interfaces/TrashBinProps.models";
import TrashBinList from "./TrashBinItemList/TrashBinList";
import BurgerMenu from "../Burger/BurgerMenu";
import TrashModalDeleteAll from "~/components/Modals/Confirmation/TrashModalDeleteAll";
import TrashModalRestoreAll from "~/components/Modals/Confirmation/TrashModalRestoreAll";

const TrashBin = ({ handleMenu, isOpen }: TrashBinProps) => {
  const {
    isOpen: isDeleteAllModalOpen,
    onOpen: onDeleteAllModalOpen,
    onOpenChange: onDeleteAllOpenChange,
    onClose: onDeleteAllModalClose,
  } = useDisclosure();
  const {
    isOpen: isRestoreAllModalOpen,
    onOpen: onRestoreAllModalOpen,
    onOpenChange: onRestoreAllModalOpenChange,
    onClose: onRestoreAllModalClose,
  } = useDisclosure();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="block w-full sm:hidden">
            <div className="block w-full lg:hidden">
              <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
            </div>
          </div>
          <Dropdown className="bg-[#161616]">
            <DropdownTrigger>
              <Button color="primary" variant="flat">
                Options
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onClick={onDeleteAllModalOpen}>
                Delete all items
              </DropdownItem>
              <DropdownItem key="copy" onClick={onRestoreAllModalOpen}>
                Restore every item
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>
      </div>

      <TrashBinList />

      <TrashModalDeleteAll
        isOpen={isDeleteAllModalOpen}
        onOpenChange={onDeleteAllOpenChange}
        onClose={onDeleteAllModalClose}
      />

      <TrashModalRestoreAll
        isOpen={isRestoreAllModalOpen}
        onOpenChange={onRestoreAllModalOpenChange}
        onClose={onRestoreAllModalClose}
      />
    </div>
  );
};

export default TrashBin;
