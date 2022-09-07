function* iterate(list: ListNode | null, limit = Infinity): Iterable<ListNode> {
  let it = list;
  for (let i = 0; i < limit; i++) {
    if (!it) break;
    const next = it.next;
    yield it;
    it = next;
  }
}

function* reverseChunks(
  list: ListNode | null,
  size: number
): Iterable<ListNode[]> {
  if (!list) {
    yield [];
    return;
  }

  const chunk = [...iterate(list, size)];

  if (chunk.length < size) {
    yield chunk;
    return;
  }

  const nextHead = chunk.at(-1)?.next ?? null;

  chunk.reverse();
  yield chunk;

  yield* reverseChunks(nextHead, size);
}

function* slidingWindow(list: ListNode[]): Iterable<[ListNode, ListNode]> {
  for (const [i, node] of list.entries()) {
    if (i <= list.length - 2) {
      yield [node, list[i + 1]];
    }
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let root: ListNode | null = null;

  let prevChunkTail: ListNode | undefined;
  for (const reversedChunk of reverseChunks(head, k)) {
    if (!root) root = reversedChunk.at(0) ?? null;
    if (prevChunkTail) prevChunkTail.next = reversedChunk.at(0) ?? null;

    for (const [prev, next] of slidingWindow(reversedChunk)) {
      prev.next = next;
    }
    prevChunkTail = reversedChunk.at(-1);
  }

  return root;
}

test("reverse k group", () => {
  expect([...serialize(reverseKGroup(parse([1, 2, 3, 4, 5]), 1))]).toEqual([
    1, 2, 3, 4, 5,
  ]);
  expect([...serialize(reverseKGroup(parse([1, 2, 3, 4, 5]), 2))]).toEqual([
    2, 1, 4, 3, 5,
  ]);
  expect([...serialize(reverseKGroup(parse([1, 2, 3, 4, 5]), 3))]).toEqual([
    3, 2, 1, 4, 5,
  ]);
  expect([...serialize(reverseKGroup(parse([1, 2, 3, 4, 5]), 4))]).toEqual([
    4, 3, 2, 1, 5,
  ]);
  expect([...serialize(reverseKGroup(parse([1, 2, 3, 4, 5]), 5))]).toEqual([
    5, 4, 3, 2, 1,
  ]);
});

function parse(list: number[]) {
  let root: ListNode | null = null;
  let node: ListNode | null = null;
  for (const x of list) {
    if (!root || !node) root = node = new ListNode(x);
    else {
      node.next = new ListNode(x);
      node = node.next;
    }
  }
  return root;
}

function* serialize(list: ListNode | null): Iterable<number> {
  let it = list;
  while (it) {
    yield it.val;
    it = it.next;
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
