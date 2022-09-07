interface Metadata {
  nUppercase: number;
  nLowercase: number;
  nDigit: number;
}

function strongPasswordChecker(password: string, meta?: Metadata): number {
  const passwordArr = password.split("");

  const nUppercase =
    meta?.nUppercase ?? passwordArr.filter((c) => /[A-Z]/.test(c)).length;
  const nLowercase =
    meta?.nLowercase ?? passwordArr.filter((c) => /[a-z]/.test(c)).length;
  const nDigit =
    meta?.nDigit ?? passwordArr.filter((c) => /[0-9]/.test(c)).length;

  let repeatedChar = "";
  let repeatedLength = 0;
  let repeatedIndex = -1;
  for (const [i, c] of passwordArr.entries()) {
    if (c === repeatedChar) {
      if (++repeatedLength > 2) {
        repeatedIndex = i;
        break;
      }
    } else {
      repeatedChar = c;
      repeatedLength = 1;
    }
  }

  const isStrong =
    password.length >= 6 &&
    password.length <= 20 &&
    nUppercase > 0 &&
    nLowercase > 0 &&
    nDigit > 0 &&
    repeatedIndex < 0;

  if (isStrong) return 0;

  // TODO
  return 5;
}

test.skip("Strong password", () => {
  expect(strongPasswordChecker("a")).toBe<number>(5);
});
