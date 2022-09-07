function longestValidParentheses(s: string): number {
  let longest = "";

  // forward
  {
    let current = "";
    const stack: string[] = [];
    for (const c of s) {
      if (c === "(") {
        current += "(";
        stack.push(c);
      } else if (c === ")") {
        if (stack.pop() === "(") {
          current += ")";
          if (stack.length === 0 && current.length > longest.length) {
            longest = current;
          }
        } else {
          current = "";
        }
      } else {
        current = "";
      }
    }
  }

  // reverse
  {
    let current = "";
    const stack: string[] = [];
    for (let i = s.length - 1; i >= 0; i--) {
      const c = s[i];
      if (c === ")") {
        current = ")" + current;
        stack.unshift(c);
      } else if (c === "(") {
        if (stack.shift() === ")") {
          current = "(" + current;
          if (stack.length === 0 && current.length > longest.length) {
            longest = current;
          }
        } else {
          current = "";
        }
      } else {
        current = "";
      }
    }
  }

  return longest.length;
}

test.each`
  s        | expected
  ${"(()"} | ${2}
`("", ({ s, expected }) => {
  expect(longestValidParentheses(s)).toBe(expected);
});
