const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type Digit = 0 | typeof DIGITS[number];
type Nine<T> = [T, T, T, T, T, T, T, T, T];
type Index = Exclude<Digit, 9>;

function* indices(): Iterable<Index> {
  for (let i = 0; i < 9; i++) yield i as Index;
}

function next(row: Index, col: Index): [row: Index, col: Index] {
  const nextRow = row + Math.max(0, col - 7);
  const nextCol = (col + 1) % 9;
  return [nextRow as Index, nextCol as Index];
}

function blockIndex(row: Index, col: Index): Index {
  const ri = Math.floor(row / 3);
  const ci = Math.floor(col / 3);
  return (3 * ri + ci) as Index;
}

function fill<T>(length: number, fillerOrValue: T | (() => T)): T[] {
  if (fillerOrValue instanceof Function) {
    const filler = fillerOrValue;
    return Array(length).fill(null).map(filler);
  } else {
    const value = fillerOrValue;
    return Array(length).fill(value);
  }
}

class Board {
  blocks = fill(9, () => new Set()) as Nine<Set<number>>;
  rows = fill(9, () => new Set()) as Nine<Set<number>>;
  columns = fill(9, () => new Set()) as Nine<Set<number>>;
  cells = fill(9, () => fill(9, 0)) as Nine<Nine<Digit>>;

  constructor(public input: Nine<Nine<string>>) {
    for (const row of indices()) {
      for (const col of indices()) {
        const num = Number(input[row][col]);
        if (num < 10) {
          const digit = num as Exclude<Digit, 0>;
          this.put(row, col, digit);
        }
      }
    }
  }

  isVacant(row: Index, col: Index) {
    return this.cells[row][col] === 0;
  }

  canPut(row: Index, col: Index, digit: Exclude<Digit, 0>) {
    return (
      !this.rows[row].has(digit) &&
      !this.columns[col].has(digit) &&
      !this.blocks[blockIndex(row, col)].has(digit)
    );
  }

  put(row: Index, col: Index, digit: Exclude<Digit, 0>) {
    this.cells[row][col] = digit;

    this.rows[row].add(digit);
    this.columns[col].add(digit);
    this.blocks[blockIndex(row, col)].add(digit);
  }

  remove(row: Index, col: Index) {
    const digit = this.cells[row][col];
    this.cells[row][col] = 0;

    this.rows[row].delete(digit);
    this.columns[col].delete(digit);
    this.blocks[blockIndex(row, col)].delete(digit);
  }

  #isSolved = false;
  isSolved() {
    this.#isSolved ||= this.columns.every((column) => column.size === 9);
    return this.#isSolved;
  }

  putNext(row: Index, col: Index): void {
    if (this.isSolved()) return;

    if (!this.isVacant(row, col)) {
      return this.putNext(...next(row, col));
    }

    for (const digit of DIGITS) {
      if (this.canPut(row, col, digit)) {
        this.put(row, col, digit);
        this.putNext(...next(row, col));
        if (this.isSolved()) return;
        this.remove(row, col);
      }
    }
  }

  solve() {
    this.putNext(0, 0);
    for (const row of indices()) {
      for (const col of indices()) {
        this.input[row][col] = `${this.cells[row][col]}`;
      }
    }
  }
}

function solveSudoku(board: Nine<Nine<string>>): void {
  new Board(board).solve();
  prettyPrint(board);
}

function prettyPrint(board: Nine<Nine<string>>) {
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

test("Sudoku solver", () => {
  const board: Nine<Nine<string>> = [
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
  expect(board).toEqual(board);
});
