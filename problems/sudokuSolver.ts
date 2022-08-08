function solveSudoku(board: string[][]): void {}

test("", () => {
  const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  solveSudoku(board);
  prettyPrint(board);
  expect(board).toEqual(board);
});

function prettyPrint(board: string[][]) {
  const lines = [] as string[];
  for (const [ri, row] of board.entries()) {
    if (ri > 0 && ri % 3 === 0) {
      lines.push(Array(11).fill("-").join("-"));
    }
    const l = row.slice(0, 3).map((c) => (c === "." ? " " : c));
    const m = row.slice(3, 6).map((c) => (c === "." ? " " : c));
    const r = row.slice(6).map((c) => (c === "." ? " " : c));
    lines.push([l.join(" "), m.join(" "), r.join(" ")].join(" | "));
  }
  console.info(lines.join("\n"));
}
