// function isValidBST(root: TreeNode | null): boolean {
//   return isValid(root);
// }

// function isValid(
//   root: TreeNode | null,
//   min = -Infinity,
//   max = Infinity
// ): boolean {
//   if (!root) return true;

//   const leftVal = root.left?.val;
//   const rightVal = root.right?.val;

//   if (Number.isFinite(leftVal)) {
//     if (leftVal! >= root.val) return false;
//     if (leftVal! <= min || leftVal! >= max) return false;
//   }
//   if (Number.isFinite(rightVal)) {
//     if (rightVal! <= root.val) return false;
//     if (rightVal! <= min || rightVal! >= max) return false;
//   }

//   return (
//     isValid(root.left, undefined, root.val) && isValid(root.right, root.val)
//   );
// }

function isValidBST(root: TreeNode | null): boolean {
  let currentVal = -Infinity;
  for (const val of traverse(root)) {
    if (val <= currentVal) return false;
    currentVal = val;
  }
  return true;
}

function* traverse(root: TreeNode | null): Iterable<number> {
  if (!root) return;

  yield* traverse(root.left);
  yield root.val;
  yield* traverse(root.right);
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
