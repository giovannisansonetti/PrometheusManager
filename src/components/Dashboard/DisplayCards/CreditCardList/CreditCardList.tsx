import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import { ApiResponse } from "./interfaces/CardList.models";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import { PaymentCard } from "@prisma/client";
import { useEffect, useState } from "react";
import CreditCardListElement from "./CreditCardListElement";
import CreditCard from "~/../public/SideBar/CreditCard.svg";
import ShowCard from "../ShowCard/ShowCard";
import Visa from "~/../public/128px-Visa_Inc._logo.svg.png";
import MasterCard from "~/../public/mc_symbol.svg";
import AmericanExpress from "~/../public/american-express.svg";
import { cardProv } from "../interfaces/AddCard.models";
import { checkCardProvider } from "utils/cardProvider";

const CreditCardList = () => {
  type ViewState = "overview" | "creditcard";

  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/showCard",
    fetcher,
  );

  console.log(data);
  const [selectedCard, setSelectedCard] = useState<PaymentCard | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("overview");
  const [provider, setProvider] = useState<cardProv>(cardProv.UNKNOWN);

  const handleClick = (card: PaymentCard) => {
    setSelectedCard(card);
    setCurrentView("creditcard");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!Array.isArray(data?.data)) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center">
        {data && data.message && (
          <p className="text-gray-500">{data.message}</p>
        )}
        {data && data.error && <p className="text-gray-500">{data.error}</p>}
      </div>
    );
  }

  const getCardImage = (PAN: string) => {
    const provider = checkCardProvider(PAN);
    switch (provider) {
      case cardProv.VISA:
        return Visa;
      case cardProv.MASTERCARD:
        return MasterCard;
      case cardProv.AMERICANEXPRESS:
        return AmericanExpress;
      default:
        return CreditCard;
    }
  };

  const renderCard = () => {
    if (selectedCard) {
      return (
        <ShowCard
          provider={getCardImage(selectedCard.PAN)}
          id={selectedCard.id}
          PAN={selectedCard.PAN}
          expiry={selectedCard.expiry}
          cvv={selectedCard.CVV}
          cardholder={selectedCard.cardholder}
          type={selectedCard.type}
        />
      );
    }
  };

  return (
    <>
      {currentView === "overview" && data && data.data ? (
        <div className="relative left-10 top-10 flex w-full flex-row gap-5">
          {data.data.map((card) => {
            return (
              <div>
                {!card.isDeleted && (
                  <CreditCardListElement
                    image={getCardImage(card.PAN)}
                    PAN={card.PAN}
                    expiry={card.expiry}
                    type={card.type}
                    onClick={() => handleClick(card)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">{renderCard()}</div>
      )}
    </>
  );
};

export default CreditCardList;
