function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;

  const rows = Array(numRows).fill("") as string[];

  let ri = 0;
  let dr = 1;

  for (const c of s) {
    rows[ri] += c;

    ri += dr;
    if (ri === numRows - 1) {
      dr = -1;
    } else if (ri === 0) {
      dr = 1;
    }
  }

  return rows.join("");
}

test.each`
  str                 | rows | expected
  ${"A"}              | ${1} | ${"A"}
  ${"AB"}             | ${1} | ${"AB"}
  ${"PAY"}            | ${2} | ${"PYA"}
  ${"PAYPALISHIRING"} | ${3} | ${"PAHNAPLSIIGYIR"}
  ${"PAYPALISHIRING"} | ${4} | ${"PINALSIGYAHRPI"}
`(`"$str", rows: $rows -> $expected`, ({ str, rows, expected }) => {
  expect(convert(str, rows)).toEqual(expected);
});
