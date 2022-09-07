function serialize(root: TreeNode | null): string {
  const s = [...traverse([root])].map((c) => `${c}`).join(",");
  console.info(s);
  return s;
}

function deserialize(data: string): TreeNode | null {
  let root: TreeNode | null = null;
  let prevLevel: Array<TreeNode | null> = [];

  const vals = data.split(",").map<number | null>((v) => JSON.parse(v));

  while (vals.length > 0) {
    if (!root) {
      root = new TreeNode(vals.shift()!);
      prevLevel = [root];
    }

    for (const parent of prevLevel) {
      if (!parent) continue;

      let val = vals.shift();
      parent.left = val ? new TreeNode(val) : null;

      val = vals.shift();
      parent.right = val ? new TreeNode(val) : null;
    }
    prevLevel = prevLevel.flatMap((n) => (n ? [n.left, n.right] : []));
  }

  return root;
}

function* traverse(
  level: Array<TreeNode | null | undefined>
): Iterable<number | null> {
  while (level.length > 0) {
    yield* level.map((n) => n?.val ?? null);
    level = level.flatMap((n) => [n?.left, n?.right]);
  }
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
