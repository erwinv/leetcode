const MAX = Math.pow(10, 6);

type Index = number;
const nil = -1 as const;
type Nil = typeof nil;
type HashFunc<K> = (key: K) => Index;

class MyHashMap<K = number, V = number> {
  #data = new Array<V | Nil>(MAX + 1).fill(nil);
  #hashFn: HashFunc<K> = (key) => {
    if (isInteger(key)) return key % (MAX + 1);
    return -1;
  };

  set hashFn(fn: HashFunc<K>) {
    this.#hashFn = fn;
  }

  put(key: K, value: V): void {
    this.#data[this.#hashFn(key)] = value;
  }

  get(key: K): V | Nil {
    return this.#data[this.#hashFn(key)];
  }

  remove(key: K): void {
    this.#data[this.#hashFn(key)] = nil;
  }
}

function isInteger(x: unknown): x is number {
  return Number.isInteger(x);
}

export default {};
