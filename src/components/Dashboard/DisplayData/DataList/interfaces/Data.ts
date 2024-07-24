export interface Data{
    id: string,
    title: string,
    webSiteLink: string,
    username: string,
    password: string,
    passwordSecurity?: string,
    notes?: string,
    createdAt: Date,
    updatedAt: Date
}