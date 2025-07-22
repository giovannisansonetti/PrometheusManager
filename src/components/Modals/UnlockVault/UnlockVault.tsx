import axios from "axios";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  Input,
} from "@nextui-org/react";
import { type ModalProps } from "../interfaces/Modal.models";
import AlertEvent from "~/components/Events/Alerts/Alert";
import { useSWRConfig } from "swr";
import Mutate from "../SwrMutate";
import { MasterPassVerificationResponse } from "~/interfaces/api.models";
import { deriveKey, sha256Hex } from "utils/encryption/keysmanagement";
import { setDerivedKey, store } from "~/store/vaultSlice";

const UnlockVaultModal = ({ isOpen, onOpenChange, onClose }: ModalProps) => {
  const { mutate } = useSWRConfig();
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [masterPass, setMasterPass] = useState("");
  const [error, setError] = useState<string>("");

  const handleVerify = async (onClose: () => void) => {
    if (!masterPass) {
      setError("Please fill the field");
    }

    const response = (
      await axios.get<MasterPassVerificationResponse>(
        "/api/auth/passVerification",
      )
    ).data;
    const verificationData = response.data;

    if (!response.success) {
      setError(response.message);
    }

    const derivedKey = await deriveKey(masterPass, verificationData.salt);
    const verification = await sha256Hex(derivedKey);

    if (verification === verificationData.verificationHash) {
      store.dispatch(setDerivedKey(derivedKey));
      void Mutate(mutate);
      onClose();
    } else {
      setError("Wrong master password");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
      className="bottom-[40%] w-[80%] bg-[#0a0a0a] sm:bottom-0 sm:w-2/4"
    >
      <ModalContent>
        {() => (
          <>
            {error ? (
              <div className="flex items-center justify-center">
                <AlertEvent
                  type="error"
                  description={error}
                  className="mt-3 w-2/4"
                />
              </div>
            ) : null}

            <ModalHeader className="mt-2 flex flex-col gap-1">
              Your vault is locked, please verify your master password to unlock
              it
            </ModalHeader>

            <ModalBody>
              <Input
                isRequired
                label="Your masterpass"
                size="sm"
                className="w-full"
                type="password"
                onValueChange={(value) => {
                  setMasterPass(value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              {confirmationLoading ? (
                <Button color="danger" isLoading>
                  Verifying...
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="flat"
                  onClick={async () => {
                    await handleVerify(onClose);
                  }}
                >
                  Confirm
                </Button>
              )}

              <Button
                color="danger"
                variant="flat"
                onClick={async () => {
                  // handle logout
                }}
              >
                Log out
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UnlockVaultModal;
