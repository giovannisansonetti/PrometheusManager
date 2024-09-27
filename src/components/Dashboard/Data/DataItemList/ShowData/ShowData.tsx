import Image from "next/image";
import type ShowDataProps from "./interfaces/ShowData.models";
import copy from "~/../public/copy.svg";
import { EyeFilledIcon } from "../../../../Eyes/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../../Eyes/EyeSlashFilledIcon";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Trash from "~/../public/SideBar/Trash.svg";
import Edit from "~/../public/pencil-square.svg";
import axios from "axios";
import type EditItemProps from "./interfaces/EditData.models";
import { fetchImage } from "~/server/fetchImg/fetchimg";
import AlertEvent from "~/components/Events/Alerts/Alert";
import {
  type UpdateDataRequest,
  type GenericApiResponse,
  type MoveToTrashRequest,
} from "~/interfaces/api.models";

const ShowData = ({
  id,
  title,
  webSiteLink,
  username,
  password,
  passwordSecurity,
  notes,
}: ShowDataProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passwordLen, setPasswordLen] = useState("");
  const [loading, setLoading] = useState(false);
  const [editview, setEditView] = useState(false);
  const toggleEdit = () => setEditView(!editview);

  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [editForm, setEditForm] = useState<EditItemProps>({
    title: title,
    webSiteLink: webSiteLink,
    username: username,
    password: password,
    notes: notes,
  });

  useEffect(() => {
    if (password) {
      setPasswordLen("•".repeat(password.length));
    }
  }, [password]);

  const saveEditedData = async () => {
    if (
      !editForm.title ||
      !editForm.webSiteLink ||
      !editForm.username ||
      !editForm.password
    ) {
      setError(true);
      setMessage("Fill all the fields");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
      return;
    }

    setLoading(true);

    const req: UpdateDataRequest = {
      title: editForm.title,
      webSiteLink: editForm.webSiteLink,
      username: editForm.username,
      password: editForm.password,
      notes: editForm.notes ?? "",
      id: id,
    };
    const request = axios.post<GenericApiResponse>("/api/data/updateData", req);
    const response = (await request).data;
    if (response.success) {
      setTimeout(() => {
        setLoading(false);
        setEditView(false);
        location.reload();
      }, 1000);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const req: MoveToTrashRequest = {
      id: id,
      type: "data",
    };
    const request = axios.post<GenericApiResponse>(
      "/api/data/moveToTrash",
      req,
    );
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    location.reload();
  };

  return (
    <div className="flex w-full flex-col items-center">
      {error ? (
        <AlertEvent
          type="error"
          description={message}
          className="mt-10 w-2/4"
        />
      ) : null}

      <Image
        src={fetchImage(webSiteLink)}
        width={40}
        height={40}
        alt=""
        className="mt-10"
      />

      <div className="mt-10 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314] p-4">
        <div className="m-3">
          <div>
            <div>Title</div>
            {editview ? (
              <Input
                placeholder="New title"
                size="sm"
                className="mt-2 w-3/4 lg:w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, title: value }));
                }}
                defaultValue={title}
              />
            ) : (
              <div className="mt-1">{title}</div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div className="">Website</div>
            {editview ? (
              <Input
                placeholder="New website link"
                size="sm"
                className="mt-2 w-3/4 lg:w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, webSiteLink: value }));
                }}
                defaultValue={webSiteLink}
              />
            ) : (
              <div>{webSiteLink}</div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Username</div>
            {editview ? (
              <Input
                placeholder="New username"
                size="sm"
                className="mt-2 w-3/4 lg:w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, username: value }));
                }}
                defaultValue={username}
              />
            ) : (
              <div className="flex w-full flex-row justify-between">
                <div className="justify-start">{username}</div>
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => navigator.clipboard.writeText(username)}
                >
                  <Image
                    src={copy as string}
                    width={20}
                    height={20}
                    alt={"copy"}
                    className="mr-[20px] cursor-pointer"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Password</div>
            <div className="flex justify-between">
              {editview ? (
                <Input
                  placeholder="New password"
                  size="sm"
                  className="mt-2 w-3/4 lg:w-1/4"
                  onValueChange={(value) => {
                    setEditForm((props) => ({ ...props, password: value }));
                  }}
                  defaultValue={password}
                />
              ) : (
                <div className="flex w-full flex-row justify-between lg:w-full">
                  {isVisible ? (
                    <div className="justify-start truncate lg:w-full">
                      {password}
                    </div>
                  ) : (
                    <div className="w-1/4 lg:w-full">{passwordLen}</div>
                  )}
                  <div className="flex flex-row justify-end">
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => navigator.clipboard.writeText(password)}
                    >
                      <Image
                        src={copy as string}
                        width={20}
                        height={20}
                        alt={"copy"}
                        className="mr-[20px] cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          {editview ? null : (
            <div className="mt-2">
              <div>Password Security</div>
              <div>{passwordSecurity}</div>
            </div>
          )}
        </div>
      </div>

      <h1 className="mt-3 text-[20px]">Notes</h1>

      {editview ? (
        <div className="mt-3 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314]">
          <Input
            placeholder="New note"
            size="sm"
            className="ml-3 w-3/4 p-3 lg:w-1/4"
            onValueChange={(value) => {
              setEditForm((props) => ({ ...props, notes: value }));
            }}
            defaultValue={notes}
          />
        </div>
      ) : (
        <div className="mt-3 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314]">
          {notes ? (
            <div className="ml-3 p-3">{notes}</div>
          ) : (
            <div className="ml-3 p-3">No notes for this item.</div>
          )}
        </div>
      )}
      <div className="mt-4 flex w-3/4 justify-end gap-3">
        {editview ? (
          <div>
            {loading ? (
              <Button
                isDisabled
                color="danger"
                variant="flat"
                onClick={toggleEdit}
              >
                Cancel
              </Button>
            ) : (
              <Button color="danger" variant="flat" onClick={toggleEdit}>
                Cancel
              </Button>
            )}
          </div>
        ) : (
          <div>
            {loading ? (
              <Button
                isLoading
                color="danger"
                variant="flat"
                onClick={async () => {
                  await handleDelete(id);
                }}
              >
                Deleting
              </Button>
            ) : (
              <Button
                color="danger"
                variant="flat"
                onClick={async () => {
                  await handleDelete(id);
                }}
              >
                <Image
                  src={Trash as string}
                  width={20}
                  height={20}
                  alt="trash"
                />
                Move to trash
              </Button>
            )}
          </div>
        )}

        {editview ? (
          <div>
            {loading ? (
              <Button variant="flat" isLoading>
                Saving data
              </Button>
            ) : (
              <Button
                variant="flat"
                onClick={async () => {
                  await saveEditedData();
                }}
              >
                Save data
              </Button>
            )}
          </div>
        ) : (
          <div>
            {loading ? (
              <Button
                isDisabled
                color="default"
                variant="flat"
                onClick={toggleEdit}
              >
                <Image
                  src={Edit as string}
                  width={20}
                  height={20}
                  alt="trash"
                />
                Edit
              </Button>
            ) : (
              <Button color="default" variant="flat" onClick={toggleEdit}>
                <Image
                  src={Edit as string}
                  width={20}
                  height={20}
                  alt="trash"
                />
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowData;
