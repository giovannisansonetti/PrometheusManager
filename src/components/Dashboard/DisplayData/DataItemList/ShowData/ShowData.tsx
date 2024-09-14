import Image from "next/image";
import ShowDataProps from "./interfaces/ShowData.models";
import copy from "~/../public/copy.svg";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Trash from "~/../public/SideBar/Trash.svg";
import Edit from "~/../public/pencil-square.svg";
import axios from "axios";
import EditItemProps from "./interfaces/EditData.models";

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

  const [editForm, setEditForm] = useState<EditItemProps>({
    title: "",
    webSiteLink: "",
    username: "",
    password: "",
    notes: "",
  });

  useEffect(() => {
    if (password) {
      setPasswordLen("•".repeat(password.length));
    }
  });

  const saveEditedData = async () => {};

  const handleDelete = async (id: string) => {
    const req = {
      id: id,
      type: "data",
    };
    const request = axios.post("/api/data/moveToTrash", req);
    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mt-3 text-[20px]">Data info</h1>

      <div className="mt-3 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314] p-4">
        <div className="ml-4 mt-3">
          <div>
            <div>Title</div>
            {editview ? (
              <Input
                placeholder="New title"
                size="sm"
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, title: value }));
                }}
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
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, webSiteLink: value }));
                }}
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
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditForm((props) => ({ ...props, username: value }));
                }}
              />
            ) : (
              <div>{username}</div>
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
                  className="mt-2 w-1/4"
                  onValueChange={(value) => {
                    setEditForm((props) => ({ ...props, password: value }));
                  }}
                />
              ) : (
                <div className="flex flex-row justify-end gap-1">
                  {isVisible ? (
                    <div className="justify-start">{password}</div>
                  ) : (
                    <div>{passwordLen}</div>
                  )}
                  <div className="flex flex-row justify-end gap-1">
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
                    <Image
                      src={copy}
                      width={20}
                      height={20}
                      alt={"copy"}
                      className="mr-[20px] cursor-pointer"
                    />
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
            className="ml-3 w-1/4 p-3"
            onValueChange={(value) => {
              setEditForm((props) => ({ ...props, notes: value }));
            }}
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
        {editview ? null : (
          <Button
            color="danger"
            variant="flat"
            onClick={async () => {
              handleDelete(id);
            }}
          >
            <Image src={Trash} width={20} height={20} alt="trash" />
            Move to trash
          </Button>
        )}

        {editview ? (
          <Button
            color="primary"
            variant="flat"
            onClick={async () => {
              saveEditedData();
            }}
          >
            Save data
          </Button>
        ) : (
          <Button color="primary" variant="flat" onClick={toggleEdit}>
            <Image src={Edit} width={20} height={20} alt="trash" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShowData;
