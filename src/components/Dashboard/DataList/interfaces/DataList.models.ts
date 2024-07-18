export interface DataListProps{
    link?: string //link of the site for the account
    icon?: string //base64 of the image or the site + /favicon.ico
    email?: string
    date?: Date //date the account was created
    type?: string //?type of account
    id?: string //unique id of the account
    onClick?: () => void
}