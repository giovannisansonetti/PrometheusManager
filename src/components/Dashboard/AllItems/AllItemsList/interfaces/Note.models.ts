export default interface Note{
    type: 'note'
    id: string
    userId: string
    trashbinId: string | null
    noteTitle: string
    noteDescription: string
    createdAt: Date
    updatedAt: Date
}
