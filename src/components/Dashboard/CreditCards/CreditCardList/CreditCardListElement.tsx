import Image from "next/image";
import { type CardListProps } from "./interfaces/CardList.models";
import { useState, useEffect } from "react";

const CreditCardListElement = ({
  PAN,
  expiry,
  image,
  type,
  onClick,
}: CardListProps) => {
  const [maskedPAN, setMaskedPAN] = useState<string>("");

  useEffect(() => {
    if (PAN) {
      const masked = "• ".repeat(PAN.length - 4) + PAN.slice(-4);
      setMaskedPAN(masked);
    }
  }, [PAN]);

  return (
    <div
      className="mb-6 mt-5 flex h-[160px] w-[240px] cursor-pointer flex-col rounded-lg border border-[#27272a] bg-[#0e0e0f] p-4 text-white transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 items-center">
          <Image src={image} width={40} height={40} alt="card icon" />
        </div>
        <div className="text-xs text-gray-400">{expiry}</div>
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <div className="text-lg font-bold">{maskedPAN}</div>
        <div className="text-lg font-bold">{type}</div>
      </div>
    </div>
  );
};

export default CreditCardListElement;
