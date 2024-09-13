export interface Note {
  id: string;
  noteTitle: string;
  noteDescription: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
