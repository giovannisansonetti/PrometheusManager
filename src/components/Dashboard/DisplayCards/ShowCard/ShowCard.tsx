import { useState } from "react";
import { ShowCardProps } from "./interface/ShowCard.models";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { EditCard } from "./interface/EditCard.models";
import Trash from "~/../public/SideBar/Trash.svg";
import Edit from "~/../public/pencil-square.svg";

const ShowCard = ({
  id,
  PAN,
  expiry,
  cvv,
  cardholder,
  type,
  provider,
}: ShowCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editview, setEditView] = useState<boolean>(false);
  const toggleEdit = () => setEditView(!editview);

  const [editCardForm, setEditCardForm] = useState<EditCard>({
    PAN: "",
    expiry: "",
    cvv: "",
    cardholder: "",
  });

  const saveEditCard = async () => {};

  const handleDelete = async (id: string) => {};

  return (
    <div className="flex w-full flex-col items-center">
      {/*<Image
                src={provider}
                width={40}
                height={40}
                alt=""
                className="mt-10"
            />*/}

      <div className="mt-10 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314] p-4">
        <div className="ml-4 mt-3">
          <div>
            <div>PAN</div>
            {editview ? (
              <Input
                placeholder="New PAN"
                size="sm"
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, PAN: value }));
                }}
                defaultValue={PAN}
              />
            ) : (
              <div className="mt-1">{PAN}</div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div className="">Expiry</div>
            {editview ? (
              <Input
                placeholder="New expiry date (FORMAT MM/YY)"
                size="sm"
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, expiry: value }));
                }}
                defaultValue={expiry}
              />
            ) : (
              <div>{expiry}</div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>CVV</div>
            {editview ? (
              <Input
                placeholder="New CVV"
                size="sm"
                className="mt-2 w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, cvv: value }));
                }}
                defaultValue={cvv}
              />
            ) : (
              <div>{cvv}</div>
            )}
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Card holder</div>
            <div className="flex justify-between">
              {editview ? (
                <Input
                  placeholder="New cardholder"
                  size="sm"
                  className="mt-2 w-1/4"
                  onValueChange={(value) => {
                    setEditCardForm((props) => ({
                      ...props,
                      cardholder: value,
                    }));
                  }}
                  defaultValue={cardholder}
                />
              ) : (
                <div>{cardholder}</div>
              )}
            </div>
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Type</div>
            <div className="flex justify-between">
              {editview ? (
                <Input
                  placeholder="New type"
                  size="sm"
                  className="mt-2 w-1/4"
                  onValueChange={(value) => {
                    setEditCardForm((props) => ({ ...props, type: value }));
                  }}
                  defaultValue={type}
                />
              ) : (
                <div>{type}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-3/4 justify-end gap-3">
        {editview ? (
          <Button color="danger" variant="flat" onClick={toggleEdit}>
            Cancel
          </Button>
        ) : (
          <div>
            {loading ? (
              <Button
                isLoading
                color="danger"
                variant="flat"
                onClick={async () => {
                  handleDelete(id);
                }}
              >
                Deleting
              </Button>
            ) : (
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
          </div>
        )}

        {editview ? (
          <div>
            {loading ? (
              <Button variant="flat" isLoading>
                Save data
              </Button>
            ) : (
              <Button variant="flat" onClick={async () => {}}>
                Save data
              </Button>
            )}
          </div>
        ) : (
          <Button color="default" variant="flat" onClick={toggleEdit}>
            <Image src={Edit} width={20} height={20} alt="trash" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
