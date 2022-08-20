function replaceNonCoprimes(nums: number[]): number[] {
  while (true) {
    // forward
    {
      let allCoprimes = true;
      for (let i = 0; i < nums.length - 1; i++) {
        const a = Math.max(nums[i], nums[i + 1]);
        const b = Math.min(nums[i], nums[i + 1]);

        if (gcd(a, b) !== 1) {
          nums[i] = -1;
          nums[i + 1] = lcm(a, b);
          allCoprimes = false;
        }
      }
      nums = nums.filter((num) => num > 0);
      if (allCoprimes) return nums;
    }

    // reverse
    {
      let allCoprimes = true;
      for (let i = nums.length - 2; i >= 0; i--) {
        const a = Math.max(nums[i], nums[i + 1]);
        const b = Math.min(nums[i], nums[i + 1]);

        if (gcd(a, b) !== 1) {
          nums[i] = lcm(a, b);
          nums[i + 1] = -1;
          allCoprimes = false;
        }
      }
      nums = nums.filter((num) => num > 0);
      if (allCoprimes) return nums;
    }
  }
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  if (a * b === 0) return 0;
  return b * (a / gcd(a, b));
}

// const binaryFnKey = (a: number, b: number) => {
//   return Symbol.for(`${a},${b}`);
// };
// function memoize<Args extends readonly unknown[], R, K>(
//   fn: (...args: Args) => R,
//   keyFn: (...args: Args) => K
// ) {
//   const cache: Map<K, R> = new Map();

//   return (...args: Args) => {
//     const key = keyFn(...args);
//     const cached = cache.get(key);
//     if (cached) return cached;
//     const result = fn(...args);
//     cache.set(key, result);
//     return result;
//   };
// }

test.each`
  nums                                                                                                                                                                                                                                                                                                                           | expected
  ${[6, 4, 3, 2, 7, 6, 2]}                                                                                                                                                                                                                                                                                                       | ${[12, 7, 6]}
  ${[2, 2, 1, 1, 3, 3, 3]}                                                                                                                                                                                                                                                                                                       | ${[2, 1, 1, 3]}
  ${[11, 9, 3, 9, 3, 9, 3, 9, 3, 3, 3, 3, 3, 33, 33, 3, 3, 3, 9, 3, 3, 9, 3, 33, 3, 33, 9, 33, 33, 33, 9, 3, 3, 9, 3, 3, 9, 3, 3, 33, 33, 9, 3, 33, 9, 3, 33, 3, 3, 33, 9, 3, 9, 33, 3, 3, 9, 9, 33, 3, 3, 3485, 85, 3485, 17, 85, 5, 205, 5, 1025, 85, 85, 205, 205, 25, 5, 425, 85, 5, 425, 5, 1025, 5, 205, 5, 425, 17, 289]} | ${[99, 296225]}
`("nums: $nums -> $expected", ({ nums, expected }) => {
  expect(replaceNonCoprimes(nums)).toEqual(expect.arrayContaining(expected));
});
