function* range(start = 0, end = Infinity): Iterable<number> {
  for (let i = start; i < end; i++) yield i;
}

type Cell = "Q" | ".";

export class Board {
  cells: Cell[][] = [];
  occupiedColumns: boolean[] = [];
  occupiedForwardDiagonals: boolean[] = [];
  occupiedBackwardDiagonals: boolean[] = [];

  forwardDiagonalIndex = (row: number, col: number) => row + col;
  backwardDiagonalIndex: (row: number, col: number) => number;

  constructor(public N: number) {
    for (const row of range(0, N)) {
      this.cells.push([]);
      for (const col of range(0, N)) {
        this.cells[row][col] = ".";
      }
    }
    for (const _ of range(0, N)) {
      this.occupiedColumns.push(false);
    }
    for (const _ of range(0, N + 1)) {
      this.occupiedForwardDiagonals.push(false);
      this.occupiedBackwardDiagonals.push(false);
    }

    this.backwardDiagonalIndex = (row: number, col: number) =>
      N - 1 - row + col;
  }

  canPut(row: number, col: number) {
    return (
      !this.occupiedColumns[col] &&
      !this.occupiedForwardDiagonals[this.forwardDiagonalIndex(row, col)] &&
      !this.occupiedBackwardDiagonals[this.backwardDiagonalIndex(row, col)]
    );
  }

  put(row: number, col: number) {
    this.cells[row][col] = "Q";

    this.occupiedColumns[col] = true;
    this.occupiedForwardDiagonals[this.forwardDiagonalIndex(row, col)] = true;
    this.occupiedBackwardDiagonals[this.backwardDiagonalIndex(row, col)] = true;
  }

  remove(row: number, col: number) {
    this.cells[row][col] = ".";

    this.occupiedColumns[col] = false;
    this.occupiedForwardDiagonals[this.forwardDiagonalIndex(row, col)] = false;
    this.occupiedBackwardDiagonals[this.backwardDiagonalIndex(row, col)] =
      false;
  }

  #solutions: string[][] = [];
  recordSolution(): void {
    const solution = this.cells.map((row) => row.join(""));
    this.#solutions.push(solution);
  }

  putNext(row: number): void {
    for (const col of range(0, this.N)) {
      if (this.canPut(row, col)) {
        this.put(row, col);
        if (row < this.N - 1) this.putNext(row + 1);
        else this.recordSolution();
        this.remove(row, col);
      }
    }
  }

  solve() {
    this.putNext(0);
    return this.#solutions;
  }
}

function solveNQueens(n: number): string[][] {
  return new Board(n).solve();
}

test("N-Queens solver", () => {
  expect(solveNQueens(1)).toEqual([["Q"]]);
});
