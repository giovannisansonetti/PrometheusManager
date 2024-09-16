import { Button } from "@nextui-org/react";
import { BackButtonProps } from "./interfaces/BackButton.models";

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button color="primary" variant="flat" onClick={onClick}>
      Go back
    </Button>
  );
};

export default BackButton;
