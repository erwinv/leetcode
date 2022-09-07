function findSubstring(s: string, words: string[]): number[] {
  const L = s.length;
  const nW = words.length;
  const W = words[0].length;
  const subL = nW * W;

  const wordsToFind = new Map<string, number>();
  for (const word of words) {
    wordsToFind.set(word, (wordsToFind.get(word) ?? 0) + 1);
  }

  const ret: number[] = [];

  for (let i = 0; i <= L - subL; i++) {
    const substr = s.substring(i, i + subL);
    if (isStringPermutation(substr, new Map(wordsToFind), W)) ret.push(i);
  }

  return ret;
}

function isStringPermutation(
  s: string,
  wordsToFind: Map<string, number>,
  wordLength: number
) {
  for (let i = 0; i < s.length; i += wordLength) {
    const word = s.substring(i, i + wordLength);
    const remaining = (wordsToFind.get(word) ?? 0) - 1;
    if (remaining < 0) return false;
    else if (remaining === 0) wordsToFind.delete(word);
    else wordsToFind.set(word, remaining);
  }

  return wordsToFind.size === 0;
}

test.each`
  s                                                     | words                                       | expected
  ${"barfoothefoobarman"}                               | ${["foo", "bar"]}                           | ${[0, 9]}
  ${"wordgoodgoodgoodbestword"}                         | ${["word", "good", "best", "word"]}         | ${[]}
  ${"barfoofoobarthefoobarman"}                         | ${["bar", "foo", "the"]}                    | ${[6, 9, 12]}
  ${"lingmindraboofooowingdingbarrwingmonkeypoundcake"} | ${["fooo", "barr", "wing", "ding", "wing"]} | ${[13]}
  ${"wordgoodgoodgoodbestword"}                         | ${["word", "good", "best", "good"]}         | ${[8]}
  ${"ababababab"}                                       | ${["ababa", "babab"]}                       | ${[0]}
  ${"ababaab"}                                          | ${["ab", "ba", "ba"]}                       | ${[1]}
`("$s, $words -> $expected", ({ s, words, expected }) => {
  expect(findSubstring(s, words)).toEqual(expected);
});
