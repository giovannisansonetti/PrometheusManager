export default function pswgen(
  length: number,
  capital: boolean,
  specialCharacter: boolean,
  digits: boolean,
) {
  const capitalLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digit = "0123456789";
  const specialCh = "!@#$%^&*_";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  let validChars: any = lowercaseLetters;

  if (capital) {
    validChars += capitalLetter;
  }
  if (specialCharacter) {
    validChars += specialCh;
  }
  if (digits) {
    validChars += digit;
  }

  if (length !== 0) {
    for (let i = 0; i < length; i++) {
      result += validChars.charAt(
        Math.floor(Math.random() * validChars.length),
      );
    }
  }

  return result;
}
