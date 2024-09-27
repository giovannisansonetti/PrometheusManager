import { useState } from "react";
import { type Note } from "../interfaces/Note";
import NotesListItem from "./NotesListElement";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import NoteIcon from "~/../public/SideBar/Document.svg";
import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import { type ApiResponse } from "../interfaces/NotesList.models";
import axios from "axios";
import {
  type GenericApiResponse,
  type MoveToTrashRequest,
} from "~/interfaces/api.models";

const NotesList = () => {
  const { data, isLoading } = useSWR<ApiResponse>(
    "/api/data/showNotes",
    fetcher,
  );

  //const { data, error, isLoading } = useSWR<Note[]>('/api/data/showNotes', fetcher)
  console.log(data);

  const [selectNote, setSelectNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (note: Note) => {
    setSelectNote(note);
    onOpen();
  };

  const handleDelete = async (id: string, onClose: () => void) => {
    setLoading(true);

    const req: MoveToTrashRequest = {
      id: id,
      type: "note",
    };
    const request = axios.post<GenericApiResponse>(
      "/api/data/moveToTrash",
      req,
    );
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    );
  }

  if (!Array.isArray(data?.data)) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center">
        {data?.message && <p className="text-gray-500">{data.message}</p>}

        {data && data.error && <p className="text-gray-500">{data.error}</p>}
      </div>
    );
  }

  return (
    <>
      {data ? (
        <div className="ml-auto mr-auto h-full w-full overflow-auto overflow-x-hidden">
          {data.data?.map((item) => {
            return (
              <div key={item.id}>
                {!item.isDeleted && (
                  <NotesListItem
                    image={NoteIcon as string}
                    title={item.noteTitle}
                    date={new Date(item.createdAt).toLocaleDateString("it-IT")}
                    onClick={() => handleClick(item)}
                  />
                )}
              </div>
            );
          })}

          <Modal
            isOpen={isModalOpen}
            onOpenChange={onOpenChange}
            className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="mt-2 flex flex-col gap-1">
                    {selectNote && (
                      <>
                        <h2 className="text-2xl font-bold">
                          {selectNote.noteTitle}
                        </h2>
                        <div className="mt-1 flex w-full border-1 border-[#27272a]"></div>
                        <p className="text-sm text-gray-500">
                          Created on:{" "}
                          {new Date(selectNote.createdAt).toLocaleDateString(
                            "it-IT",
                          )}
                        </p>
                      </>
                    )}
                  </ModalHeader>
                  <ModalBody>
                    {selectNote && (
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Content</p>
                        <p className="text-sm">{selectNote.noteDescription}</p>
                      </div>
                    )}
                  </ModalBody>

                  {selectNote && (
                    <ModalFooter>
                      {loading ? (
                        <Button color="danger" isLoading>
                          Deleting
                        </Button>
                      ) : (
                        <Button
                          color="danger"
                          variant="flat"
                          onClick={async () => {
                            await handleDelete(selectNote.id, onClose);
                          }}
                        >
                          Delete note
                        </Button>
                      )}
                      <Button color="primary" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <div>No notes found</div>
      )}
    </>
  );
};

export default NotesList;
