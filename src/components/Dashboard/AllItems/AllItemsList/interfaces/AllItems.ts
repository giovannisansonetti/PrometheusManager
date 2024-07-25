export interface AllItems{
    data: {
        id: string,
        title: string,
        webSiteLink: string,
        username: string,
        password: string,
        passwordSecurity?: string,
        notes?: string,
        createdAt: Date,
        updatedAt: Date
    },
    notes: {
        noteTitle: string
        noteDescription: string
        createdAt: Date
        updatedAt: Date
    }
}