import { Skeleton } from "@nextui-org/react";

const PswHealthSkeleton = () => {
  return (
    <div className="flex h-[15%] w-[80%] items-center justify-center rounded-lg border-1 border-[#27272a] bg-[#131314] sm:h-1/4 sm:w-2/4">
      <div className="ml-7">
        <Skeleton className="flex w-12 rounded-full sm:h-[50px]" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="ml-7 h-6 w-3/5 rounded-lg" />
        <Skeleton className="ml-7 flex h-8 w-1/6 flex-row rounded-lg"></Skeleton>
      </div>
    </div>
  );
};

export default PswHealthSkeleton;
