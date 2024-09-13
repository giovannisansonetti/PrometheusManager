export default function checkSecurityPass(password: string) {
  const commonPasswords = ["123456", "password", "qwerty"];
  const hasCommonPassword = commonPasswords.includes(password.toLowerCase());

  const uppercaseLetterRegex = /[A-Z]/;
  const lowercaseLetterRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_\-+=~`{}[\]|\\:;"'<>,.?/]/;
  const keyboardPatterns = /1234|qwerty|asdf/;

  const containsUppercaseLetter = uppercaseLetterRegex.test(password);
  const containsLowercaseLetter = lowercaseLetterRegex.test(password);
  const containsDigit = digitRegex.test(password);
  const containsSpecialChar = specialCharRegex.test(password);
  const matchesKeyboardPattern = keyboardPatterns.test(password);

  let score = 0;

  if (password.length >= 12) score += 2;
  if (containsUppercaseLetter) score += 1;
  if (containsLowercaseLetter) score += 1;
  if (containsDigit) score += 1;
  if (containsSpecialChar) score += 2;
  if (!matchesKeyboardPattern) score += 2;

  if (hasCommonPassword) {
    return "Very Weak - Common Password";
  } else if (score >= 8) {
    return "Very Strong";
  } else if (score >= 6) {
    return "Strong";
  } else if (score >= 4) {
    return "Weak";
  } else {
    return "Very Weak";
  }
}
