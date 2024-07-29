type DataItem = {
    type: 'data';
    id: string;
    userId: string;
    trashbinId: string | null;
    title: string;
    webSiteLink: string;
    username: string;
    passwordSecurity: string | null;
    password: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
  
type NoteItem = {
    type: 'note';
    id: string;
    userId: string;
    trashbinId: string | null;
    noteTitle: string;
    noteDescription: string;
    createdAt: Date;
    updatedAt: Date;
}
  
export type AllItems = DataItem | NoteItem;
  