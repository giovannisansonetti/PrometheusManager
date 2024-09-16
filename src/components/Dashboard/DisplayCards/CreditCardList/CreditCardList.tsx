import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import { ApiResponse } from "./interfaces/CardList.models";
import ListSkeleton from "~/components/ListSkeleton/ListSkeleton";
import { PaymentCard } from "@prisma/client";
import { useState } from "react";

const CreditCardList = () => {
  type ViewState = "overview" | "creditcard";

  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/data/showCard",
    fetcher,
  );
  const [selectedCard, setSelectedCard] = useState<PaymentCard | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("overview");

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

  const renderCard = () => {
    /*TODO: make a component that displays the selected card*/
  };

  return (
    <>
      {/*currentView === "overview" && data && data.data ? (
                <div className="ml-auto mr-auto h-full w-full overflow-auto overflow-x-hidden">
                    {data.data.map((card) =>{
                        return(
                            <div>
                                {!card.isDeleted && (
                                    
                                )}
                            </div>
                        )
                    })}
                </div>
                ) : (
                    <div className="flex items-center justify-center">{renderCard()}</div>
                )*/}
    </>
  );
};

export default CreditCardList;
