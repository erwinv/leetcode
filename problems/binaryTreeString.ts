function tree2str(root: TreeNode | null): string {
  if (!root) return "";

  const val = `${root.val}`;
  const left = tree2str(root.left);
  const right = tree2str(root.right);

  return val + (left || right ? `(${left})` : "") + (right ? `(${right})` : "");
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function parse(xs: number[]): TreeNode {
  const root = new TreeNode(NaN);
  let prev: TreeNode[];

  for (const x of xs) {
    if (Number.isNaN(root.val)) {
      root.val = x;
      prev = [root];
      continue;
    }
  }

  return root;
}

test.skip.each`
  root                  | expected
  ${[1, 2, 3, 4]}       | ${"1(2(4))(3)"}
  ${[1, 2, 3, null, 4]} | ${"1(2()(4))(3)"}
`("$root -> $expected", ({ root, expected }) => {
  expect(tree2str(parse(root))).toBe(expected);
});
