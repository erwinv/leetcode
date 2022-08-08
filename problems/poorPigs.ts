function poorPigs(
  buckets: number,
  minutesToDie: number,
  minutesToTest: number
): number {
  const numTests = Math.floor(minutesToTest / minutesToDie);

  for (let numPigs = 0; true; numPigs++) {
    if (Math.pow(numTests + 1, numPigs) >= buckets) return numPigs;
  }
}

test.each`
  buckets | minutesToDie | minutesToTest | expected
  ${1}    | ${1}         | ${1}          | ${0}
  ${2}    | ${1}         | ${1}          | ${1}
  ${3}    | ${1}         | ${2}          | ${1}
  ${4}    | ${1}         | ${3}          | ${1}
  ${4}    | ${1}         | ${1}          | ${2}
  ${7}    | ${1}         | ${2}          | ${2}
  ${9}    | ${1}         | ${2}          | ${2}
  ${1000} | ${15}        | ${60}         | ${5}
`(
  "buckets: $buckets, minutesToDie: $minutesToDie, minutesToTest: $minutesToTest -> $expected",
  ({ buckets, minutesToDie, minutesToTest, expected }) => {
    expect(poorPigs(buckets, minutesToDie, minutesToTest)).toEqual(expected);
  }
);
