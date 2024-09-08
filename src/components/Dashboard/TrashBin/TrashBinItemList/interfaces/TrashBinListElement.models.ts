import { AllItems } from "~/server/data/showdata/allitems.models"

export default interface TrashBinListElementProps{
    item: AllItems
    deletionDate?: string
    onClick: () => void
}