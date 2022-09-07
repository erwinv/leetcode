function* iterateAscending(lists: Array<ListNode | null>): Iterable<ListNode> {
  let smallest = {
    listIndex: -1,
    value: Infinity,
  };

  for (const [li, list] of lists.entries()) {
    if (!list) continue;
    if (list.val < smallest.value) {
      smallest.listIndex = li;
      smallest.value = list.val;
    }
  }

  if (smallest.listIndex >= 0) {
    const smallestNode = lists[smallest.listIndex]!;
    lists[smallest.listIndex] = smallestNode.next;
    smallestNode.next = null;

    yield smallestNode;

    yield* iterateAscending(lists);
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let root: ListNode | null = null;
  let prev: ListNode | null = null;
  for (const smallestNode of iterateAscending(lists)) {
    if (!root || !prev) {
      root = prev = smallestNode;
    } else {
      prev.next = smallestNode;
      prev = prev.next;
    }
  }
  return root;
}

test("Merge K Lists", () => {
  expect([
    ...serialize(
      mergeKLists(
        parse([
          [1, 4, 5],
          [1, 3, 4],
          [2, 6],
        ])
      )
    ),
  ]).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  expect([...serialize(mergeKLists(parse([[1]])))]).toEqual([1]);
});

function parse(lists: number[][]) {
  const listNodes: ListNode[] = [];
  for (const list of lists) {
    let listNode: ListNode | null = null;
    for (const x of list) {
      if (!listNode) {
        listNode = new ListNode(x);
        listNodes.push(listNode);
      } else {
        listNode.next = new ListNode(x);
        listNode = listNode.next;
      }
    }
  }
  return listNodes;
}

function* serialize(list: ListNode | null): Iterable<number> {
  if (list) {
    yield list.val;
    yield* serialize(list.next);
  }
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
