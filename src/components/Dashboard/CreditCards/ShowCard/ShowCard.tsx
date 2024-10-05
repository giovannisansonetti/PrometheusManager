import { useEffect, useState } from "react";
import { type ShowCardProps } from "./interface/ShowCard.models";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { type EditCard } from "./interface/EditCard.models";
import Trash from "~/../public/SideBar/Trash.svg";
import Edit from "~/../public/pencil-square.svg";
import axios from "axios";
import { EyeFilledIcon } from "~/components/Eyes/EyeFilledIcon";
import { EyeSlashFilledIcon } from "~/components/Eyes/EyeSlashFilledIcon";
import copy from "~/../public/copy.svg";
import {
  type UpdateCardRequest,
  type GenericApiResponse,
  type MoveToTrashRequest,
} from "~/interfaces/api.models";
import { useSWRConfig } from "swr";
import useBackButtonStore from "../../DynamicActionButton/DynamicActionButtonStore";
import Mutate from "~/components/Modals/SwrMutate";

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
  const { mutate } = useSWRConfig();
  const [maskedPan, setMaskedPAN] = useState<string>("");
  const [IsPANVisible, setIsPANVisible] = useState<boolean>(false);
  const { goBack, setGoBack } = useBackButtonStore();
  const [maskedCVV, setmaskedCVV] = useState<string>("");
  const [isCVVvisible, setCVVvisible] = useState<boolean>(false);

  const togglePANVisibility = () => setIsPANVisible(!IsPANVisible);
  const toggleCVVvisibility = () => setCVVvisible(!isCVVvisible);

  const [editCardForm, setEditCardForm] = useState<EditCard>({
    PAN: PAN,
    expiry: expiry,
    cvv: cvv,
    cardholder: cardholder,
  });

  const saveEditCard = async () => {
    if (
      !editCardForm.PAN ||
      !editCardForm.expiry ||
      !editCardForm.cvv ||
      !editCardForm.cardholder
    ) {
      return;
    }

    setLoading(true);
    const request: UpdateCardRequest = {
      id: id,
      PAN: editCardForm.PAN,
      expiry: editCardForm.expiry,
      cvv: editCardForm.cvv,
      cardholder: editCardForm.cardholder,
    };
    const req = axios.post<GenericApiResponse>("/api/data/updateCard", request);

    const response = (await req).data;
    if (response.success) {
      setTimeout(() => {
        setLoading(false);
        setEditView(false);
        setGoBack(!goBack);
        void Mutate(mutate);
      }, 1500);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const req: MoveToTrashRequest = {
      id: id,
      type: "card",
    };
    const request = axios.post<GenericApiResponse>(
      "/api/data/moveToTrash/",
      req,
    );

    const response = (await request).data;

    if (response.success) {
      setTimeout(() => {
        setLoading(false);
        setGoBack(!goBack);
        void Mutate(mutate);
      }, 1500);
    }
  };

  useEffect(() => {
    if (PAN) {
      const maskedPAN = "• ".repeat(PAN.length - 4) + PAN.slice(-4);
      setMaskedPAN(maskedPAN);
    }
    if (cvv) {
      const maskeddcvv = "• ".repeat(cvv.length);
      setmaskedCVV(maskeddcvv);
    }
  }, [PAN, cvv]);

  return (
    <div className="flex w-full flex-col items-center">
      {<Image src={provider} width={70} height={70} alt="" className="mt-10" />}

      <div className="mt-10 w-3/4 items-center rounded-lg border-1 border-[#27272a] bg-[#131314] p-4">
        <div className="ml-4 mt-3">
          <div>
            <div>PAN</div>
            {editview ? (
              <Input
                placeholder="New PAN"
                size="sm"
                className="mt-2 sm:w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, PAN: value }));
                }}
                defaultValue={PAN}
              />
            ) : (
              <div className="flex w-full flex-row justify-between gap-1">
                {IsPANVisible ? (
                  <div className="justify-start">{PAN}</div>
                ) : (
                  <div>{maskedPan}</div>
                )}
                <div className="flex flex-row justify-end gap-1">
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePANVisibility}
                  >
                    {IsPANVisible ? (
                      <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(PAN)}
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

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div className="">Expiry</div>
            {editview ? (
              <Input
                placeholder="New expiry date (FORMAT MM/YY)"
                size="sm"
                className="mt-2 sm:w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, expiry: value }));
                }}
                defaultValue={expiry}
              />
            ) : (
              <div className="flex w-full flex-row justify-between">
                {expiry}
                <button
                  className="justify-end focus:outline-none"
                  type="button"
                  onClick={() => navigator.clipboard.writeText(expiry)}
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
            <div>CVV</div>
            {editview ? (
              <Input
                placeholder="New CVV"
                size="sm"
                className="mt-2 sm:w-1/4"
                onValueChange={(value) => {
                  setEditCardForm((props) => ({ ...props, cvv: value }));
                }}
                defaultValue={cvv}
              />
            ) : (
              <div className="flex w-full flex-row justify-between gap-1">
                {isCVVvisible ? (
                  <div className="justify-start">{cvv}</div>
                ) : (
                  <div>{maskedCVV}</div>
                )}
                <div className="flex flex-row justify-end gap-1">
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleCVVvisibility}
                  >
                    {isCVVvisible ? (
                      <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(cvv)}
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

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Card holder</div>
            <div className="flex justify-between">
              {editview ? (
                <Input
                  placeholder="New cardholder"
                  size="sm"
                  className="mt-2 sm:w-1/4"
                  onValueChange={(value) => {
                    setEditCardForm((props) => ({
                      ...props,
                      cardholder: value,
                    }));
                  }}
                  defaultValue={cardholder}
                />
              ) : (
                <div className="flex w-full flex-row justify-between">
                  {cardholder}
                  <button
                    className="justify-end focus:outline-none"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(cardholder)}
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
          </div>

          <div className="mt-2 flex border-1 border-[#27272a]"></div>

          <div className="mt-2">
            <div>Type</div>
            <div className="flex justify-between">{type}</div>
          </div>
        </div>
      </div>
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
                  await saveEditCard();
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

export default ShowCard;
