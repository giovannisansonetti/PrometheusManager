type DataItem = {
    type: 'data'
    id: string
    userId: string
    title: string
    webSiteLink: string
    username: string
    password: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    passwordSecurity: string
    isDeleted: boolean
}
  
type NoteItem = {
    type: 'note'
    id: string
    userId: string
    noteTitle: string
    noteDescription: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
}

export type AllItems = DataItem | NoteItem
 
export type ApiResponse = {
    status: number,
    message?: string,
    error: boolean,
    data: AllItems[]
}