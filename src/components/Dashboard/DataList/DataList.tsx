import { useEffect, useState } from "react";
import { type Data } from "./interfaces/Data";
import { fetchData } from "~/server/data/showdata/showdata";
import DataListItem from "./DataListItem";
import DataListIdle from "./DataListIdle";

const DataList = () =>{

    const [data, setData] = useState<Data[] | null>(null);

    useEffect(() => {
        const getData = async () => {
            const responseString = await fetchData()
            if (responseString) {
                const response: Data[] = JSON.parse(responseString);
                setData(response)
            }
        }
        getData()
    }, [])


    return(
        <>
            { data ? (
                data.map((item) =>{
                        <DataListItem link={item.webSiteLink} email={item.username} />
                })
            ) : (
                <div>
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                    <DataListIdle />
                </div>
            )} 
        </>
    )

    {/*
        <div className="w-full flex justify-center items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>  
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
            </div>)
        data ? (
            <ul>
                {data.map((item) => (
                    <div></div>
                ))}
            </ul>
        ) : (
            <div className="w-full flex justify-center items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12"/>
                </div>  
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg"/>
                    <Skeleton className="h-3 w-4/5 rounded-lg"/>
                </div>
                </div>
                    )}
            </div>*/}

}

export default DataList