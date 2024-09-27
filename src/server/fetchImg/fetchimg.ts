import Password from "~/../public/SideBar/Password.svg";

export const fetchImage = (url?: string): string => {
  const regex = /\w+\.\w+/;
  if (url?.match(regex) != null) {
    return `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
  }

  return Password as string;
};
