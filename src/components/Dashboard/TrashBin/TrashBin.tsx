import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import { TrashBinProps } from "./interfaces/TrashBinProps.models"
import TrashBinList from "./TrashBinItemList/TrashBinList"
import deleteAll from "~/server/data/manageData/delete/deleteAll"
import restoreAll from "~/server/data/manageData/restore/restoreAll"

const TrashBin = ({handleMenu, isOpen}: TrashBinProps) => {
    
    const { isOpen: isDeleteAllModalOpen, onOpen: onDeleteAllModalOpen, onOpenChange: onDeleteAllOpenChange } = useDisclosure()
    const { isOpen: isRestoreAllModalOpen, onOpen: onRestoreAllModalOpen, onOpenChange: onRestoreAllModalOpenChange} = useDisclosure()

    return(
        <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto">
            <div className="">
                <div className="flex justify-end items-center mt-5 mr-7 ">
                    <div className="w-full block sm:hidden">
                        <button onClick={handleMenu} className="p-2 rounded ml-5 ">
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>
                    <Dropdown className="bg-[#161616]">
                        <DropdownTrigger>
                            <Button
                                color="primary"
                                variant="flat"
                            >
                            Options
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new" onClick={onDeleteAllModalOpen}>Delete all items</DropdownItem>
                            <DropdownItem key="copy" onClick={onRestoreAllModalOpen}>Restore every item</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>

            <TrashBinList />

            <Modal isOpen={isDeleteAllModalOpen} onOpenChange={onDeleteAllOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2">Do you want to delete all the items?</ModalHeader>
                            <ModalFooter>
                                <Button color="primary" variant="flat" onPress={onClose}>Undo</Button>
                                <Button color="danger" variant="flat" onClick={async() => {deleteAll()}}>Delete</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isRestoreAllModalOpen} onOpenChange={onRestoreAllModalOpenChange} className="w-[80%] bottom-[40%] sm:bottom-0 sm:w-2/4 bg-[#0a0a0a]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2">Do you want to restore all the items?</ModalHeader>
                            <ModalFooter>
                                <Button color="primary" variant="flat" onPress={onClose}>Undo</Button>
                                <Button color="danger" variant="flat" onClick={async() => {restoreAll()}}>Delete</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default TrashBin