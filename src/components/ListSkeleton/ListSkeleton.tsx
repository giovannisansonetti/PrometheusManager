import { Skeleton } from "@nextui-org/react";

const ListSkeleton = () => {
  return (
    <div className="mt-5 flex w-3/4 items-center justify-center gap-3 border-1 border-[#27272a] p-4">
      <div>
        <Skeleton className="flex w-12 rounded-full sm:h-[50px]" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
};

export default ListSkeleton;
