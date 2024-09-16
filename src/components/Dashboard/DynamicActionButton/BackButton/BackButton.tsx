import { Button } from "@nextui-org/react";
import useBackButtonStore from "../DynamicActionButtonStore";

const BackButton = () => {
  const { goBack, setGoBack } = useBackButtonStore();
  return (
    <Button color="primary" variant="flat" onClick={() => setGoBack(false)}>
      Go back
    </Button>
  );
};

export default BackButton;
