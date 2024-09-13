import { useState } from "react";
import { Button, Slider, Switch } from "@nextui-org/react";
import pswgen from "utils/pswgen";
import checkSecurityPass from "utils/pswsecuritychecker";
import { PswGeneratorProps } from "./PswGeneratorProps.models";

const PswGenerator = ({ handleMenu, isOpen }: PswGeneratorProps) => {
  const [security, setSecurity] = useState("");
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [useCapital, setCapital] = useState(false);
  const [useSpecialChars, setSpecialChars] = useState(false);
  const [useDigits, setDigits] = useState(false);

  const generate = () => {
    const generatedPassword = pswgen(
      length,
      useCapital,
      useSpecialChars,
      useDigits,
    );
    setPassword(generatedPassword);
    const security = checkSecurityPass(generatedPassword);
    setSecurity(security);
  };

  const copyButton = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden overflow-y-auto bg-[#161616] text-white lg:rounded-lg">
      <div className="relative w-full">
        <div className="mr-7 mt-5 flex items-center justify-end">
          <div className="flex lg:hidden">
            <button onClick={handleMenu} className="ml-5 rounded p-2">
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"}`}
              ></span>
            </button>
          </div>

          <h1 className="flex w-full justify-center lg:text-[30px]">
            Password Generator
          </h1>
        </div>
      </div>

      <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>

      <div className="relative mt-5 h-[80%] w-[90%] items-center rounded-lg bg-[#0a0a0a] sm:h-3/4 sm:w-[80%]">
        <div className="flex h-1/4 w-full items-center justify-center rounded-lg bg-[#0f0f0f] text-[20px] sm:text-[40px]">
          <div className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center">
            {password}
          </div>
        </div>

        <div className="mt-[10%] flex flex-col items-center justify-center sm:mt-[6%]">
          <div className="mt-4 flex w-full border-1 border-[#27272a] sm:w-2/4"></div>
          <div className="mt-4 flex w-full flex-row justify-between px-4 sm:w-2/4 sm:px-0">
            <div className="justify-start">Length</div>
            <Slider
              step={1}
              maxValue={32}
              minValue={5}
              defaultValue={5}
              className="w-3/4 justify-end sm:max-w-sm"
              onChange={(value) => {
                if (typeof value === "number") {
                  setLength(value);
                  generate();
                }
              }}
            />
            <div className="justify-end">{length}</div>
          </div>

          <div className="mt-4 flex w-full border-1 border-[#27272a] sm:w-2/4"></div>

          <div className="mt-3 flex w-full flex-row justify-between px-4 sm:w-2/4 sm:px-0">
            <div className="justify-start">Capital letters (A-Z)</div>
            <Switch
              className="justify-end"
              isSelected={useCapital}
              onValueChange={() => {
                setCapital(!useCapital);
                generate();
              }}
            />
          </div>

          <div className="mt-2 flex w-full border-1 border-[#27272a] sm:w-2/4"></div>

          <div className="mt-3 flex w-full flex-row justify-between px-4 sm:w-2/4 sm:px-0">
            <div className="justify-start">Digits (1-9)</div>
            <Switch
              className="justify-end"
              isSelected={useDigits}
              onValueChange={() => {
                setDigits(!useDigits);
                generate();
              }}
            />
          </div>

          <div className="mt-2 flex w-full border-1 border-[#27272a] sm:w-2/4"></div>

          <div className="mt-3 flex w-full flex-row justify-between px-4 sm:w-2/4 sm:px-0">
            <div className="justify-start">Special chars (@!$%&*)</div>
            <Switch
              className="justify-end"
              isSelected={useSpecialChars}
              onValueChange={() => {
                setSpecialChars(!useSpecialChars);
                generate();
              }}
            />
          </div>

          <div className="mt-2 flex w-full border-1 border-[#27272a] sm:w-2/4"></div>

          <div className="mt-3 flex w-full flex-row justify-between px-4 sm:w-2/4 sm:px-0">
            <div className="justify-start">Password's security</div>
            <div>{security}</div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button color="primary" variant="flat" onPress={copyButton}>
            Copy
          </Button>
          <Button color="primary" variant="flat" onPress={generate}>
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PswGenerator;
