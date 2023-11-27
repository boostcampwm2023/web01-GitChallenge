import classnames from "../classnames";

describe("classnames", () => {
  test.each([
    { expected: "", input: [""] },
    { expected: "", input: [" "] },
    { expected: "foo bar", input: ["foo", "bar"] },
    { expected: "foo bar", input: ["foo", "bar", "", " "] },
    { expected: "foo bar a", input: [" foo ", " bar ", "", " ", " a "] },
  ])(`classnames(...$input)는 $expected를 반환한다`, ({ input, expected }) => {
    expect(classnames(...input)).toBe(expected);
  });
});
