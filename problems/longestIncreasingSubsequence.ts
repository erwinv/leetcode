function setDiff(long: Seq, short: Seq) {
  return new Set([...long.nums].filter((num) => !short.nums.has(num)));
}

function isSubSeq(long: Seq, short: Seq) {
  return long.len > short.len && setDiff(short, long).size === 0;
}

class Seq {
  len: number = 0;
  min: number;
  nums: Set<number>;
  constructor(public tip: number, public prev?: Seq) {
    this.len = (prev?.len ?? 0) + 1;
    this.min = prev?.min ?? tip;
    this.nums = new Set(prev?.nums);
    this.nums.add(tip);
  }

  tryAppend(num: number): [Seq, Seq?] {
    if (this.nums.has(num)) return [this];

    if (num > this.tip) {
      return [new Seq(num, this)];
    }

    if (num < this.min) {
      return [this, new Seq(num)];
    }

    for (let seq = this.prev; seq; seq = seq.prev) {
      if (num > seq.tip) {
        return [this, new Seq(num, seq)];
      }
    }

    return [this, new Seq(num)];
  }
}

function strictlyIncreasingSubsequences(nums: number[]) {
  const firstseq = new Seq(nums.shift()!);
  const seqs = [firstseq];

  for (const num of nums) {
    const newseqs: Seq[] = [];

    for (const [i, seq] of [...seqs.entries()]) {
      const [updatedseq, newseq] = seq.tryAppend(num);
      seqs[i] = updatedseq;

      if (newseq) {
        newseqs.push(newseq);
      }
    }

    for (const newseq of newseqs) {
      if (seqs.some((s) => isSubSeq(s, newseq))) {
        continue;
      }
      seqs.push(newseq);
    }
  }

  // console.dir(seqs.map((s) => s.nums));
  return seqs;
}

function longest(subsequences: Seq[]) {
  return subsequences.reduce((longest, subseq) => {
    return subseq.len > longest.len ? subseq : longest;
  });
}

function lengthOfLIS(nums: number[]): number {
  if (nums.length < 2) return nums.length;
  return longest(strictlyIncreasingSubsequences(nums)).len;
}

const long = [
  -813, 82, -728, -82, -432, 887, -551, 324, -315, 306, -164, -499, -873, -613,
  932, 177, 61, 52, 1000, -710, 372, -306, -584, -332, -500, 407, 399, -648,
  290, -866, 222, 562, 993, -338, -590, 303, -16, -134, 226, -648, 909, 582,
  177, 899, -343, 55, 629, 248, 333, 1, -921, 143, 629, 981, -435, 681, 844,
  349, 613, 457, 797, 695, 485, 15, 710, -450, -775, 961, -445, -905, 466, 942,
  995, -289, -397, 434, -14, 34, -903, 314, 862, -441, 507, -966, 525, 624,
  -706, 39, 152, 536, 874, -364, 747, -35, 446, -608, -554, -411, 987, -354,
  -700, -34, 395, -977, 544, -330, 596, 335, -612, 28, 586, 228, -664, -841,
  -999, -100, -620, 718, 489, 346, 450, 772, 941, 952, -560, 58, 999, -879, 396,
  -101, 897, -1000, -566, -296, -555, 938, 941, 475, -260, -52, 193, 379, 866,
  226, -611, -177, 507, 910, -594, -856, 156, 71, -946, -660, -716, -295, -927,
  148, 620, 201, 706, 570, -659, 174, 637, -293, 736, -735, 377, -687, -962,
  768, 430, 576, 160, 577, -329, 175, 51, 699, -113, 950, -364, 383, 5, 748,
  -250, -644, -576, -227, 603, 832, -483, -237, 235, 893, -336, 452, -526, 372,
  -418, 356, 325, -180, 134, -698,
];

test.each`
  nums                                       | expected
  ${[7, 7, 7, 7, 7, 7, 7]}                   | ${1}
  ${[0, 1, 0, 3, 2, 3]}                      | ${4}
  ${[10, 9, 2, 5, 3, 7, 101, 18]}            | ${4}
  ${[5, 7, -24, 12, 13, 2, 3, 12, 5, 6, 35]} | ${6}
  ${[3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12]}     | ${6}
`("$nums -> $expected", ({ nums, expected }) => {
  expect(lengthOfLIS(nums)).toEqual(expected);
});
