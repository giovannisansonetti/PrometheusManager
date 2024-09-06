import IssueListProps from "./interfaces/IssueList.models"

const IssueList = ({type} : IssueListProps) =>{
    return(
        <>
            { type === "weak" && (
                <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">
                    
                </div>
            )}

            { type === "weak" && (
                <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">
                    
                </div>
            )}

            { type === "weak" && (
                <div className="flex flex-col bg-[#161616] text-white w-full h-full sm:rounded-lg overflow-hidden overflow-y-auto lg:items-center">
                    
                </div>
            )}
        </>
    )
}

export default IssueList