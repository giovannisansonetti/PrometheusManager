export default interface IssueListProps{
    type: string    
    data?: Data
}

interface Data{
    id?: string
    password?: string
    _count?: number
}