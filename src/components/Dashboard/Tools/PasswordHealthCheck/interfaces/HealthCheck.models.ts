export default interface PswHealthCheckProps{
    handleMenu: ()=>void
    isOpen: boolean
}

export default interface HealthCheck{
    weakPassword: { id: string; password: string; _count: number }[]
    oldPassword: { id: string; password: string; _count: number }[]
    reusedPasswords: { id: string; password: string; _count: number }[]
}
