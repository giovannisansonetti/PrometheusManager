import { Skeleton } from "@nextui-org/react";

const PswHealthSkeleton = () =>{
    return(
        <div className="w-[80%] h-[15%] sm:w-2/4 sm:h-1/4 border-1 border-[#27272a] rounded-lg flex justify-center items-center bg-[#131314]" >
            <div className="ml-7">
                <Skeleton className="flex rounded-full w-12 sm:h-[50px]"/>
            </div>  
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-6 w-3/5 rounded-lg ml-7"/>
                <Skeleton className="w-1/6 h-8 rounded-lg flex flex-row ml-7"></Skeleton>
            </div>
        </div>
    )
}

export default PswHealthSkeleton