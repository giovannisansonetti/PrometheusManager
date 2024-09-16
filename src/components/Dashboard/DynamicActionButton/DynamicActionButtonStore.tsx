import { create } from "zustand";

type ButtonStore = {
  goBack: boolean;
  setGoBack: (value: boolean) => void;
};

const useBackButtonStore = create<ButtonStore>((set) => ({
  goBack: false,
  setGoBack: (value: boolean) => set({ goBack: value }),
}));

export default useBackButtonStore;
