function searchMatrix(matrix: number[][], target: number): boolean {
  const rowIndex = binarySearch(matrix, (row) => {
    const less = target < row[0];
    const greater = target > row.at(-1)!;
    if (!less && !greater) return 0;
    return target - row[0];
  });

  if (rowIndex < 0) return false;

  return binarySearch(matrix[rowIndex], (x) => target - x) > -1;
}

/**
 * @return negative value if x < target, positive if x > target, 0 if x is the target
 */
type OrderFunction<T> = (x: T, i: number, xs: T[]) => number;

function binarySearch<T>(
  xs: T[],
  orderFn: OrderFunction<T>,
  from = 0,
  until = xs.length
): number {
  const N = until - from;
  if (N < 1) return -1;

  const i = Math.floor(N / 2) + from;
  const x = xs[i];

  const order = orderFn(x, i, xs);

  return order === 0
    ? i
    : order < 0
    ? binarySearch(xs, orderFn, from, i)
    : binarySearch(xs, orderFn, i + 1, until);
}

test.each`
  matrix             | target | expected
  ${[[1], [3], [5]]} | ${5}   | ${true}
`("$matrix, $target -> $expected", ({ matrix, target, expected }) => {
  expect(searchMatrix(matrix, target)).toBe(expected);
});
