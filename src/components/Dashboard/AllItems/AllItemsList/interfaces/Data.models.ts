export default interface Data{
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
    isDeleted: boolean
}