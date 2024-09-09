import Data from "~/components/Dashboard/AllItems/AllItemsList/interfaces/Data.models"

export interface DataListProps{
    title?: string
    link?: string //link of the site for the account
    icon?: string //base64 of the image or the site + /favicon.ico
    email?: string
    date?: string //date the account was created
    type?: string //?type of account
    id?: string //unique id of the account
    onClick?: () => void
    onDelete?: () => void
    onModify?: () => void
}

export type ApiResponse = {
    status: number
    message?: string
    error?: boolean
    data?: Data[]
}