function lengthOfLongestSubstring(s: string): number {
  let longest = "";
  const chars: Set<string> = new Set();

  let current = "";
  for (const c of s) {
    if (!chars.has(c)) {
      current += c;
      chars.add(c);
    } else {
      if (current.length > longest.length) {
        longest = current;
      }
      const [left, right] = current.split(c);
      current = right + c;
      for (const c of left) {
        chars.delete(c);
      }
    }
  }
  if (current.length > longest.length) {
    longest = current;
  }

  return longest.length;
}

test.each`
  str           | expected
  ${"abcabcbb"} | ${3}
  ${"bbbbb"}    | ${1}
  ${"pwwkew"}   | ${3}
  ${" "}        | ${1}
`(`"$str" -> $expected`, ({ str, expected }) => {
  expect(lengthOfLongestSubstring(str)).toEqual(expected);
});
