import { useState } from "react"
import { Button, Slider, Switch } from "@nextui-org/react"
import pswgen from "utils/pswgen"
import checkSecurityPass from "utils/pswsecuritychecker"
import { PswGeneratorProps } from "./PswGeneratorProps.models"


const PswGenerator = ({ handleMenu, isOpen }:PswGeneratorProps) => {

  const [security, setSecurity] = useState("")
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [useCapital, setCapital] = useState(false)
  const [useSpecialChars, setSpecialChars] = useState(false)
  const [useDigits, setDigits] = useState(false)
    
  const generate = () => {
    const generatedPassword = pswgen(length, useCapital, useSpecialChars, useDigits)
    setPassword(generatedPassword)
    const security = checkSecurityPass(generatedPassword)
    setSecurity(security)
  }

  const copyButton = () => {
    if(password){
        navigator.clipboard.writeText(password)
    }
  }
  
  return (
    <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto items-center">
        <div className="relative w-full">
            <div className="flex justify-end items-center mt-5 mr-7">
                <div className="lg:hidden flex">
                    <button onClick={handleMenu} className="p-2 rounded ml-5">
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </button>
                </div>

                <h1 className="lg:text-[30px] flex justify-center w-full">
                    Password Generator
                </h1>
            </div>                
        </div>   

        <div className="flex w-full mt-4 border-1 border-[#27272a]"></div>

        <div className="relative w-[90%] h-[80%] sm:w-[80%] sm:h-3/4 bg-[#0a0a0a] rounded-lg items-center mt-5">
            <div className="w-full rounded-lg h-1/4 bg-[#0f0f0f] flex items-center justify-center text-[20px] sm:text-[40px]">
            <div className="w-[90%] text-center overflow-hidden text-ellipsis whitespace-nowrap">{password}</div>
            </div>

            <div className="flex flex-col items-center justify-center mt-[10%] sm:mt-[6%]">
            <div className="flex w-full sm:w-2/4 mt-4 border-1 border-[#27272a]"></div>
            <div className="w-full sm:w-2/4 flex flex-row mt-4 justify-between px-4 sm:px-0">
                <div className="justify-start">Length</div>
                <Slider
                    step={1}
                    maxValue={32}
                    minValue={5}
                    defaultValue={5}
                    className="w-3/4 sm:max-w-sm justify-end"
                    onChange={(value) => {
                        if (typeof value === 'number') {
                          setLength(value)
                        }
                    }}
                />
                <div className="justify-end">{length}</div>
            </div>

            <div className="flex w-full sm:w-2/4 mt-4 border-1 border-[#27272a]"></div>

            <div className="w-full sm:w-2/4 flex flex-row mt-3 justify-between px-4 sm:px-0">
                <div className="justify-start">Capital letters (A-Z)</div>
                <Switch
                className="justify-end"
                isSelected={useCapital}
                onValueChange={setCapital}
                />
            </div>

            <div className="flex w-full sm:w-2/4 mt-2 border-1 border-[#27272a]"></div>

            <div className="w-full sm:w-2/4 flex flex-row mt-3 justify-between px-4 sm:px-0">
                <div className="justify-start">Digits (1-9)</div>
                <Switch
                className="justify-end"
                isSelected={useDigits}
                onValueChange={setDigits}
                />
            </div>

            <div className="flex w-full sm:w-2/4 mt-2 border-1 border-[#27272a]"></div>

            <div className="w-full sm:w-2/4 flex flex-row mt-3 justify-between px-4 sm:px-0">
                <div className="justify-start">Special chars (@!$%&*)</div>
                <Switch
                className="justify-end"
                isSelected={useSpecialChars}
                onValueChange={setSpecialChars}
                />
            </div>

            <div className="flex w-full sm:w-2/4 mt-2 border-1 border-[#27272a]"></div>

            <div className="w-full sm:w-2/4 flex flex-row mt-3 justify-between px-4 sm:px-0">
                <div className="justify-start">Password's security</div>
                <div>
                    {security}
                </div>
            </div>

            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button color="primary" variant="flat" onPress={copyButton}>Copy</Button>
            <Button color="primary" variant="flat" onPress={generate}>Generate</Button>
            </div>
        </div>
    </div>
  )
}

export default PswGenerator
