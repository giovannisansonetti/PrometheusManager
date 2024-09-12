import { type Note } from "../interfaces/Note"

export interface NotesListProps{
    title: string
    date: string
    image: string
    onClick: () => void
    onDelete?: () => void
    onModify?: () => void
}

export type ApiResponse = {
    status: number
    message?: string
    error?: boolean
    data?: Note[]
}
