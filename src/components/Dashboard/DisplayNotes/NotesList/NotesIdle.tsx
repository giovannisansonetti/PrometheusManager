import {Skeleton} from "@nextui-org/react";

const NotesIdle = () =>{
    return(
        <div className="w-3/4 flex p-4 justify-center items-center gap-3 mt-5 border-1 border-[#27272a]">
            <div>
                <Skeleton className="flex rounded-full w-12 sm:h-[50px]"/>
            </div>  
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
        </div>
    )
}
export default NotesIdle