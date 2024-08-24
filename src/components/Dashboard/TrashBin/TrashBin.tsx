import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import { TrashBinProps } from "./interfaces/TrashBinProps.models"
const TrashBin = ({handleMenu, isOpen}: TrashBinProps) => {
    
    const { isOpen: isDeleteAllModalOpen, onOpen: onDeleteAllModalOpen, onOpenChange: onDeleteAllOpenChange } = useDisclosure()

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
                    <Button
                        color="danger"
                        variant="flat"
                        onClick={onDeleteAllModalOpen}
                    >
                        Delete all items
                    </Button>
                </div>
                <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>
            </div>
        </div>
    )
}

export default TrashBin