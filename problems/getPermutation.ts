function getPermutation(n: number, k: number): string {
  let s = [...take([1, 2, 3, 4, 5, 6, 7, 8, 9], n)];

  const rs = [...range(1, n + 1)];
  let r = rs.pop();
  let d = 0;

  while (k >= 0 && r) {
    const p = nPr(r - 1, r - 1);
    if (p < k) {
      k -= p;

      const i = n - r;
      swap(s, i, i + ++d);
    } else {
      r = rs.pop();
      d = 0;
    }
  }

  return s.join("");
}

function nPr(n: number, r: number): number {
  return factorial(n) / factorial(n - r);
}

function factorial(n: number): number {
  return n === 0 ? 1 : n * factorial(n - 1);
}

function swap<T>(xs: T[], i: number, j: number): void {
  const temp = xs[i];
  xs[i] = xs[j];
  xs[j] = temp;
}

function* range(start = 0, end = Infinity) {
  for (let i = start; i < end; i++) yield i;
}

function* take<T>(xs: Iterable<T>, n = Infinity): Iterable<T> {
  let i = 0;
  for (const x of xs) {
    if (++i > n) break;
    yield x;
  }
}

test.each`
  n    | k         | expected
  ${3} | ${3}      | ${"213"}
  ${4} | ${9}      | ${"2314"}
  ${9} | ${278893} | ${"793416258"}
  ${9} | ${353955} | ${"972561438"}
`("n: $n, k: $k -> $expected", ({ n, k, expected }) => {
  expect(getPermutation(n, k)).toBe(expected);
});
