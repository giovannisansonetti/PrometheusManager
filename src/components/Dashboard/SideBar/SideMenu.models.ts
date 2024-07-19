export interface SideMenuProps {
    active: string,
    setActive: (active: string) => void,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}