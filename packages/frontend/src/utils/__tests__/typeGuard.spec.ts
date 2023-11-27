import { isString } from "../typeGuard";

describe("isString", () => {
  test.each([
    ["", true],
    [" ", true],
    ["c", true],
    ["string", true],
    [String(10), true],
    [{}, false],
    [() => {}, false],
    [function a() {}, false],
    [NaN, false],
    [undefined, false],
    [null, false],
  ])(`isString(%p)는 %p를 반환한다`, (value, expected) => {
    expect(isString(value)).toBe(expected);
  });
});
