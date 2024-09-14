export default interface PswHealthCheckProps {
  handleMenu: () => void;
  isOpen: boolean;
}

export type HealthCheck = {
  weakPasswords: { password: string; _count: number }[];
  oldPasswords: { password: string; _count: number }[];
  //reusedPasswords: {password: string; _count: number }[]
};

export type ApiResponse = {
  status: number;
  message?: string;
  error?: boolean;
  data: HealthCheck;
};
