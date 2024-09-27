interface Ip {
  ip: string;
}

export const getIp = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = (await response.json()) as Ip;
  return data.ip;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOs = async () => {
  // implement with a library
};

export default getIp;
