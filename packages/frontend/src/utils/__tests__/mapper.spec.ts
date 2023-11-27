import toCodeTag from "../mapper";

describe("toCodeTag", () => {
  test.each([
    ["", ""],
    ["`git add`", "<code>git add</code>"],
    ["`git add", "`git add"],
    ["`git add``", "<code>git add</code>`"],
    ["This is a `code` example.", "This is a <code>code</code> example."],
    [
      "Here are `multiple` `code` examples.",
      "Here are <code>multiple</code> <code>code</code> examples.",
    ],
    [
      "`git add``git commit``git push`",
      "<code>git add</code><code>git commit</code><code>git push</code>",
    ],
    [
      [
        "당신은 새로운 팀에 배정되었습니다. 이제부터 전임자의 일을 이어서 진행해야 합니다.",
        "",
        "1. 원본 저장소 `upstream`이 있다.",
        "2. 우리 팀에서 `upstream`으로부터 fork한 저장소인 `origin`이 있다.",
      ].join("\n"),
      [
        "당신은 새로운 팀에 배정되었습니다. 이제부터 전임자의 일을 이어서 진행해야 합니다.",
        "",
        "1. 원본 저장소 <code>upstream</code>이 있다.",
        "2. 우리 팀에서 <code>upstream</code>으로부터 fork한 저장소인 <code>origin</code>이 있다.",
      ].join("\n"),
    ],
  ])("toCodeTag(%p)는 %p를 반환한다.", (input, expected) => {
    expect(toCodeTag(input)).toBe(expected);
  });
});
