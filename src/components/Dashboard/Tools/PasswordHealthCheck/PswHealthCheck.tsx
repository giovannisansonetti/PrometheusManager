import { useEffect, useState } from "react";
import Image from "next/image";
import arrow from "~/../public/arrow-right-short.svg";
import { IconBxXCircle } from "public/IconBxXCircle";
import { IconBxTime } from "public/IconBxTime";
import IssueList from "./IssueList/IssueList";
import back from "~/../public/back-svgrepo-com.svg";
import PswHealthCheckProps from "./interfaces/HealthCheck.models";
import { type HealthCheck, ApiResponse } from "./interfaces/HealthCheck.models";
import PswHealthSkeleton from "~/components/ListSkeleton/PswHealthSkeleton";
import useSWR from "swr";
import { fetcher } from "~/server/fetcher";
import BurgerMenu from "../../Burger/BurgerMenu";

type ViewState =
  | "overview"
  | "weakPasswords"
  | "reusedPasswords"
  | "oldPasswords";

const PswHealthCheck = ({ handleMenu, isOpen }: PswHealthCheckProps) => {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "api/healthCheck",
    fetcher,
  );
  console.log(data);

  const [healthCheckItems, setHealthCheckItems] = useState<HealthCheck | null>(
    null,
  );
  const [currentView, setCurrentView] = useState<ViewState>("overview");

  useEffect(() => {
    console.log("Data update:", data);
    if (data && healthCheckItems == null) {
      console.log("Data from API:", data);
      setHealthCheckItems(data.data);
    }
  }, [data]);

  const renderIssue = () => {
    if (currentView === "weakPasswords") {
      if (
        healthCheckItems?.weakPasswords &&
        healthCheckItems.weakPasswords.length !== 0
      ) {
        return (
          <div className="flex w-full justify-center">
            {healthCheckItems.weakPasswords.map((item) => (
              <IssueList type="weakPasswords" data={item} />
            ))}
          </div>
        );
      } else {
        return <div>No weak passwords found.</div>;
      }
    }

    // not implemented yet
    /*if (currentView === "reusedPasswords") {
        return (
          <div className="w-full flex justify-center">
              {healthCheckItems?.reusedPasswords.map((item) => (
                    <IssueList type="reusedPasswords" data={item} />
              ))}
          </div>
        )
      }*/

    // not implemented yet
    if (currentView === "oldPasswords") {
      if (
        healthCheckItems?.oldPasswords &&
        healthCheckItems.oldPasswords.length !== 0
      ) {
        return (
          <div className="flex w-full justify-center">
            {healthCheckItems.oldPasswords.map((item) => (
              <IssueList type="oldPasswords" data={item} />
            ))}
          </div>
        );
      } else {
        return <div>No old passwords found.</div>;
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto bg-[#161616] text-white lg:items-center lg:rounded-lg">
      <div className="relative w-full">
        <div className="mr-7 mt-5 flex items-center justify-end">
          {currentView === "overview" ? (
            <div className="block w-full lg:hidden">
              <BurgerMenu handleMenu={handleMenu} isOpen={isOpen} />
            </div>
          ) : (
            <div className="flex">
              <div
                className="ml-5 flex cursor-pointer flex-row items-center"
                onClick={() => setCurrentView("overview")}
              >
                <Image src={back} width={19} height={19} alt="back" />
                <span className="ml-1 text-[14px] sm:text-[16px]">Back</span>
              </div>
            </div>
          )}

          {currentView === "overview" && (
            <h1 className="flex w-full justify-center lg:text-[30px]">
              Password Health Check
            </h1>
          )}

          {currentView === "weakPasswords" && (
            <h1 className="flex w-full justify-center lg:text-[30px]">
              Weak passwords list
            </h1>
          )}

          {currentView === "reusedPasswords" && (
            <h1 className="flex w-full justify-center lg:text-[30px]">
              Reused passwords list
            </h1>
          )}

          {currentView === "oldPasswords" && (
            <h1 className="w-full justify-center text-center lg:text-[30px]">
              Reused passwords list
            </h1>
          )}
        </div>
      </div>

      <div className="mt-5 flex w-full border-1 border-[#27272a]"></div>

      {healthCheckItems ? (
        <div className="mt-5 flex h-full w-full flex-col items-center justify-center gap-5 px-5">
          {currentView === "overview" ? (
            <>
              <div
                className="bg flex h-[15%] w-[80%] cursor-pointer items-center justify-between rounded-lg border-1 border-[#27272a] bg-[#131314] sm:h-1/4 sm:w-2/4"
                onClick={() => setCurrentView("weakPasswords")}
              >
                {healthCheckItems.weakPasswords &&
                healthCheckItems.weakPasswords.length > 0 ? (
                  <div className="ml-7 justify-start">
                    <div className="flex-col">
                      <div className="flex flex-row">
                        <IconBxXCircle height={"35px"} />
                        <h1 className="ml-2 text-[18px] lg:text-[25px]">
                          Weak password(s) found
                        </h1>
                      </div>
                      <div className="ml-2 flex flex-row text-[25px] sm:mt-5 lg:text-[35px]">
                        {healthCheckItems.weakPasswords.length}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-7 justify-start">
                    <div className="flex-col">
                      <div className="flex flex-row">
                        <IconBxXCircle height={"35px"} />
                        <h1 className="ml-2 text-[18px] lg:text-[25px]">
                          Weak password(s) found
                        </h1>
                      </div>
                      <div className="ml-2 flex flex-row text-[25px] sm:mt-5 lg:text-[35px]">
                        0
                      </div>
                    </div>
                  </div>
                )}
                <Image
                  width={"40"}
                  height={"40"}
                  src={arrow}
                  alt=""
                  className="mr-2 flex cursor-pointer justify-end"
                ></Image>
              </div>

              {/*<div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-between items-center bg-[#131314] cursor-pointer" onClick={() => {setCurrentView("reusedPasswords")}}>
                        {healthCheckItems.reusedPasswords && healthCheckItems.reusedPasswords.length > 0 ? (
                            <div className="justify-start ml-7">
                                <div className="flex-col">
                                    <div className="flex flex-row">
                                        <IconIonCopy height={"35px"} />
                                        <h1 className="lg:text-[25px] ml-2">Reused passwords(s) found</h1>
                                    </div>
                                        <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">
                                        {healthCheckItems.reusedPasswords.length}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="justify-start ml-7">
                                <div className="flex-col">
                                    <div className="flex flex-row">
                                        <IconIonCopy height={"35px"} />
                                        <h1 className="lg:text-[25px] ml-2">Reused passwords(s) found</h1>
                                    </div>
                                    <div className="text-[25px] lg:text-[35px] sm:mt-5 ml-2 flex flex-row">0</div>
                                </div>
                            </div>
                        )}
                        <Image
                            width={"40"}
                            height={"40"}
                            src={arrow}
                            alt=""
                            className="cursor-pointer flex justify-end mr-2"
                        />  
                    </div> */}

              <div
                className="flex h-[15%] w-[80%] cursor-pointer items-center justify-between rounded-lg border-1 border-[#27272a] bg-[#131314] sm:h-1/4 sm:w-2/4"
                onClick={() => {
                  setCurrentView("oldPasswords");
                }}
              >
                {healthCheckItems.oldPasswords &&
                healthCheckItems.oldPasswords.length > 0 ? (
                  <div className="ml-7 justify-start">
                    <div className="flex-col">
                      <div className="flex flex-row">
                        <IconBxTime height={"35px"} />
                        <h1 className="ml-2 text-[18px] lg:text-[25px]">
                          Old password(s) found
                        </h1>
                      </div>
                      <div className="ml-2 mt-1 flex flex-row text-[25px] sm:mt-5 lg:text-[35px]">
                        {healthCheckItems.oldPasswords.length}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-7 justify-start">
                    <div className="flex-col">
                      <div className="flex flex-row">
                        <IconBxTime height={"35px"} />
                        <h1 className="ml-2 lg:text-[25px]">
                          Old passwords(s) found
                        </h1>
                      </div>
                      <div className="ml-2 mt-3 flex flex-row text-[25px] sm:mt-5 lg:text-[35px]">
                        0
                      </div>
                    </div>
                  </div>
                )}
                <Image
                  width={"40"}
                  height={"40"}
                  src={arrow}
                  alt=""
                  className="mr-2 flex cursor-pointer justify-end"
                ></Image>
              </div>
            </>
          ) : (
            <div className="mt-5 flex h-full w-full flex-col items-start gap-5 px-5">
              {renderIssue()}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
          <PswHealthSkeleton />
          <PswHealthSkeleton />
          <PswHealthSkeleton />
        </div>
      )}
    </div>
  );
};

export default PswHealthCheck;
