interface BurgerMenuProps {
  handleMenu: () => void;
  isOpen: boolean;
}
const BurgerMenu = ({ handleMenu, isOpen }: BurgerMenuProps) => {
  return (
    <button onClick={handleMenu} className="ml-5 rounded p-2">
      <span
        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"}`}
      ></span>
      <span
        className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`}
      ></span>
      <span
        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"}`}
      ></span>
    </button>
  );
};

export default BurgerMenu;
