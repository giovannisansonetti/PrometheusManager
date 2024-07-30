export default interface Data{
    type: 'data'
    id: string
    userId: string
    trashbinId: string | null
    title: string
    webSiteLink: string
    username: string
    passwordSecurity: string | null
    password: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
}