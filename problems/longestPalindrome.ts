function longestPalindrome(s: string): string {
  return s;
}

test.skip.each`
  str        | expected
  ${"babad"} | ${"bab"}
  ${"cbbd"}  | ${"bb"}
`(`"$str" -> "$expected"`, ({ str, expected }) => {
  expect(longestPalindrome(str)).toEqual(expected);
});
