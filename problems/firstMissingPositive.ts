function firstMissingPositive(nums: number[]): number {
  const nextMissing: Map<number, number> = new Map();

  for (const num of nums) {
    if (num < 0) continue;

    let next = num + 1;
    while (nextMissing.has(next)) {
      next = nextMissing.get(next)!;
    }
    nextMissing.set(num, next);

    let prev = num - 1;
    while (nextMissing.has(prev) || prev === 0) {
      nextMissing.set(prev, nextMissing.get(num)!);
      prev--;
    }
  }

  return nextMissing.get(0) ?? 1;
}

test.each`
  nums                  | expected
  ${[1, 2, 0]}          | ${3}
  ${[3, 4, -1, 1]}      | ${2}
  ${[7, 8, 9, 11, 12]}  | ${1}
  ${[1, 2, 6, 3, 5, 4]} | ${7}
`("$nums -> $expected", ({ nums, expected }) => {
  expect(firstMissingPositive(nums)).toBe(expected);
});
