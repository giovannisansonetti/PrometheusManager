export interface AllItems{ // body della risposta
    data: {
        id: string;
        userId: string;
        trashbinId: string | null;
        title: string;
        webSiteLink: string;
        username: string;
        passwordSecurity: string | null;
        password: string;
        iv: string;
        salt: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    },
    notes: {
        noteTitle: string
        noteDescription: string
        createdAt: Date
        updatedAt: Date
    }
}