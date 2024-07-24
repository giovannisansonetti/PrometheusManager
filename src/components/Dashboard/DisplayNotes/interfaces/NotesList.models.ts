export interface NotesListProps{
    title: string
    date: string
    image: string
    onClick: () => void
    onDelete?: () => void
    onModify?: () => void
}