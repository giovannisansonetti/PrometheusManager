export default interface Note {
  type: "note";
  id: string;
  userId: string;
  noteTitle: string;
  noteDescription: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
