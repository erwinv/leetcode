function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  const cache: Map<number, number> = new Map();

  function _combinationSum4(nums: number[], target: number): number {
    const cached = cache.get(target) ?? NaN;
    if (!Number.isNaN(cached)) return cached;

    let acc = 0;
    for (const num of nums) {
      if (num > target) break;
      if (num === target) {
        acc++;
        break;
      }
      acc += _combinationSum4(nums, target - num);
    }

    cache.set(target, acc);
    return acc;
  }

  return _combinationSum4(nums, target);
}

test.each`
  nums         | target | expected
  ${[9]}       | ${3}   | ${0}
  ${[1]}       | ${1}   | ${1}
  ${[1]}       | ${2}   | ${1}
  ${[1, 2]}    | ${2}   | ${2}
  ${[1, 2, 3]} | ${4}   | ${7}
  ${[2, 1, 3]} | ${35}  | ${1132436852}
`("nums: $nums, target: $target -> $expected", ({ nums, target, expected }) => {
  expect(combinationSum4(nums, target)).toEqual(expected);
});
