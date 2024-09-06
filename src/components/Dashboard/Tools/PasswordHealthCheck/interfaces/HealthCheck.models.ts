export default interface PswHealthCheckProps{
    handleMenu: ()=>void
    isOpen: boolean
}

export default interface HealthCheck{
    weakPassword: number
    oldPassword: number
    reusedPasswords: { password: string; _count: number }[]
}
