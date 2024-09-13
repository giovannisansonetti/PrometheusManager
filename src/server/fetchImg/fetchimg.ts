export const fetchImage = (url?: string): string => {
  const regex = /\w+\.\w+/;
  if (url != null && url.match(regex) != null) {
    return `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
  }

  return "/~/../public/SideBar/Password.svg";
};
