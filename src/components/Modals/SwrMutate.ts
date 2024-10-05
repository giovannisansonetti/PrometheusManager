import { type ScopedMutator } from "swr/_internal";

const urls = [
  "/api/data/showData",
  "/api/data/showNotes",
  "/api/data/showCard",
  "/api/data/allitems",
];

export default async function Mutate(mutate: ScopedMutator) {
  await mutate((key: string | undefined) => urls.includes(key ?? ""), true);
}
