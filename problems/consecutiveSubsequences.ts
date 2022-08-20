function isPossible(nums: number[]): boolean {
  return subsequences(nums).every((seq) => seq.length >= 3);
}

function subsequences(nums: number[]): number[][] {
  const subseqs: number[][] = [];

  for (const num of nums) {
    let consumed = false;

    for (const seq of subseqs) {
      if (seq.at(-1) === num - 1) {
        seq.push(num);
        consumed = true;
        break;
      }
    }

    if (!consumed) subseqs.unshift([num]);
  }

  return subseqs.reverse();
}

test.each`
  nums                              | expected
  ${[1, 2, 3, 3, 4, 5]}             | ${[[1, 2, 3], [3, 4, 5]]}
  ${[1, 2, 3, 4, 5, 6]}             | ${[[1, 2, 3, 4, 5, 6]]}
  ${[1, 2, 3, 3, 4, 4, 5, 5]}       | ${[[1, 2, 3, 4, 5], [3, 4, 5]]}
  ${[1, 2, 3, 4, 4, 5]}             | ${[[1, 2, 3, 4], [4, 5]]}
  ${[1, 2, 3, 4, 4, 5, 6, 5, 7, 8]} | ${[[1, 2, 3, 4, 5], [4, 5, 6, 7, 8]]}
`("nums: $nums -> $expected", ({ nums, expected }) => {
  expect(subsequences(nums)).toEqual(expected);
});
