function uniqueMorseRepresentations(words: string[]): number {
  return uniqueMorse(words).size;
}

const MORSE = new Map([
  ["a", ".-"],
  ["b", "-..."],
  ["c", "-.-."],
  ["d", "-.."],
  ["e", "."],
  ["f", "..-."],
  ["g", "--."],
  ["h", "...."],
  ["i", ".."],
  ["j", ".---"],
  ["k", "-.-"],
  ["l", ".-.."],
  ["m", "--"],
  ["n", "-."],
  ["o", "---"],
  ["p", ".--."],
  ["q", "--.-"],
  ["r", ".-."],
  ["s", "..."],
  ["t", "-"],
  ["u", "..-"],
  ["v", "...-"],
  ["w", ".--"],
  ["x", "-..-"],
  ["y", "-.--"],
  ["z", "--.."],
]);

function morse(word: string): string {
  return word
    .split("")
    .map((c) => MORSE.get(c))
    .join("");
}

function uniqueMorse(words: string[]) {
  return new Set(words.map(morse));
}

test.each`
  words                           | expected
  ${["a"]}                        | ${[".-"]}
  ${["gin", "zen", "gig", "msg"]} | ${["--...-.", "--...--."]}
`("words: $words -> $expected", ({ words, expected }) => {
  expect(uniqueMorse(words)).toEqual(new Set(expected));
});
