import { env } from "~/env";

const validateCardNumber = (cardNumber: string): boolean => {
  if (env.NODE_ENV == "development") {
    return true;
  }
  const reversedDigits = cardNumber.split("").reverse().map(Number);

  const checkSum = reversedDigits.reduce((sum, digit, idx) => {
    if (idx % 2 === 1) {
      const doubled = digit * 2;
      return sum + (doubled > 9 ? doubled - 9 : doubled);
    }
    return sum + digit;
  }, 0);

  return checkSum % 10 === 0;
};

export default validateCardNumber;
