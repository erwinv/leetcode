function levelOrder(root: Node | null): number[][] {
  if (!root) return [];
  return [...traverse([root])];
}

function* traverse(level: Node[]): Iterable<number[]> {
  while (level.length > 0) {
    yield level.map((n) => n.val);
    level = level.flatMap((n) => n.children);
  }
}

export class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}
