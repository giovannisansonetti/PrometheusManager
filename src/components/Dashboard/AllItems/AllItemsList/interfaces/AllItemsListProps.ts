export type ItemsListType = "data" | "notes" //| "creditcard"


// TODO: implement 
export interface DataItem {
    title?: string
    link?: string 
    icon?: string 
    email?: string
    date?: string 
    id?: string 
    onClick?: () => void
    onDelete?: () => void
    onModify?: () => void
}

export interface NoteItem {
    title: string
    date: string
    image: string
    onClick?: () => void
    onDelete?: () => void
    onModify?: () => void
}

/*export interface CreditCardItem {
    id: string
    type: "creditcard"
    title: string
    cardNumber: string
    expiryDate: string
    cvv: string
    date: string
}*/

export type AllItemsListProps = DataItem | NoteItem  //| CreditCardItem