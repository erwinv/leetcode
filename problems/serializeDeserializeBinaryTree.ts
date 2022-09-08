function serialize(root: TreeNode | null): string {
  const s: string[] = [];
  let indexOfLastNonNull = -1;
  let i = 0;
  for (const val of traverse([root])) {
    s.push(`${val}`);
    if (val !== null) {
      indexOfLastNonNull = i;
    }
    i++;
  }
  s.splice(indexOfLastNonNull + 1);
  return s.join(",");
}

function* traverse(level: Array<TreeNode | null>): Iterable<number | null> {
  while (true) {
    let vals: Array<number | null> = [];
    for (const node of level) {
      const val = node?.val ?? null;
      vals.push(val);
    }
    if (vals.filter((v) => Number.isFinite(v)).length < 1) return;
    if (vals.length > 0) yield* vals;
    level = level.flatMap((node) => {
      if (!node) return [];
      return [node.left, node.right];
    });
  }
}

function deserialize(data: string): TreeNode | null {
  if (data === "") return null;

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
      parent.left = Number.isFinite(val) ? new TreeNode(val!) : null;

      val = vals.shift();
      parent.right = Number.isFinite(val) ? new TreeNode(val!) : null;
    }
    prevLevel = prevLevel.flatMap((n) => (n ? [n.left, n.right] : []));
  }

  return root;
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

test.each`
  root
  ${""}
  ${"1,2,3,null,null,4,5"}
  ${"1,2,3,null,null,4,5,6,7"}
  ${"4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2"}
  ${"0,0,0,0,null,null,1,null,null,null,2"}
`("serialize . deserialize == identity: [$root]", ({ root }) => {
  expect(serialize(deserialize(root))).toEqual(root);
});
