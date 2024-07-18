import {Skeleton} from "@nextui-org/react";

const DataListIdle = () =>{
    return(
        <div className="w-full flex justify-center items-center gap-3 mt-5 border-2 ">
            <div>
                <Skeleton className="flex rounded-full w-12 sm:h-[60px]"/>
            </div>  
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
        </div>
    )
}
export default DataListIdle