import { Button } from "@nextui-org/react";
import { type NormalButtonProps } from "./interfaces/NormalButton.models";

const NormalButton = ({ text, onClick }: NormalButtonProps) => {
  return (
    <Button color="primary" variant="flat" onClick={onClick}>
      {text}
    </Button>
  );
};

export default NormalButton;
