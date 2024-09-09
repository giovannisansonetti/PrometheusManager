export default interface PswHealthCheckProps{
    handleMenu: ()=>void
    isOpen: boolean
}

export type HealthCheck = {
    weakPassword: { id: string; password: string; _count: number }[]
    oldPassword: { id: string; password: string; _count: number }[]
    reusedPasswords: { id: string; password: string; _count: number }[]
}

export type ApiResponse = {
    status: number,
    message?: string,
    error?: boolean,
    data: HealthCheck
}