import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from "@testing-library/user-event";

import { Editor } from "../Editor";
import "@testing-library/jest-dom";

const mockData = `
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
#
# Initial commit
#
# Changes to be committed:
#       new file:   .editorconfig
#       new file:   .gitattributes
#       new file:   .gitignore
#       new file:   .idea/inspectionProfiles/Project_Default.xml
#       new file:   .idea/vcs.xml
#       new file:   .idea/workspace.xml
#       new file:   .vscode/extensions.json
#       new file:   .vscode/settings.json
#       new file:   .yarn/sdks/integrations.yml
#       new file:   .yarn/sdks/typescript/bin/tsc
#       new file:   .yarn/sdks/typescript/bin/tsserver
#       new file:   .yarn/sdks/typescript/lib/tsc.js
`;

describe("Editor", () => {
  describe("초기 데이터가 전달되면", () => {
    it("편집기에 전달받은 초기 데이터를 보여준다.", () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);

      expect(screen.getByTestId("textarea")).toHaveValue(mockData);
    });

    it("편집기는 명령 모드로 textarea에 입력이 안된다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      await user.type(
        screen.getByTestId("textarea"),
        "이 값을 타이핑해도 TextArea의 값이 바뀌지 않아야함.",
      );

      expect(screen.getByTestId("textarea")).toHaveValue(mockData);
    });

    it("편집기의 명령 모드로 명령어 입력 input에도 입력이 되지 않는다.", () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);

      expect(screen.getByTestId("input")).toHaveAttribute("readonly");
    });
  });

  describe("명령 모드에서 i를 누르면", () => {
    it("편집기는 입력모드로 textarea에 입력이 가능하다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      await user.type($textarea, "테스트");

      expect($textarea).not.toHaveValue(mockData);
    });

    it("편집기의 textarea에 커서가 포커싱 되어야 한다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      expect(document.activeElement).toEqual($textarea);
    });

    it('편집기는 입력모드로 input에는 "-- INSERT --" 이 입력 된다.', async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      const $input = screen.getByTestId("input");

      expect($input).toHaveValue("-- INSERT --");
    });

    it("편집기는 입력모드로 input은 입력이 되지 않는다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      const $input = screen.getByTestId("input");
      await user.type($input, "테스트");

      expect($input).toHaveValue("-- INSERT --");
    });
  });

  describe("입력 모드에서 esc를 누르면", () => {
    it("편집기는 명령모드로 input은 빈 값이다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");

      expect($input).toHaveValue("");
    });

    it("편집기는 명령모드로 textarea에 커서가 포커싱 되어야 한다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");
      expect(document.activeElement).toEqual($textarea);
    });

    it("편집기는 명령모드로 textarea에 입력이 되지 않는다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");

      await user.type($textarea, "테스트");
      expect($textarea).toHaveValue(mockData);
    });
  });

  describe("명령 모드에서 :(콜론)을 누르면 편집기는 라인 모드로 전환되며", () => {
    it("편집기의 textarea는 입력이 불가능하다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, ":");

      expect($textarea).toHaveValue(mockData);
    });

    it("편집기의 input에는 초기값이 :(콜론)으로 들어간다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, ":");

      expect($input).toHaveValue(":");
    });

    it("편집기의 input에 포커싱이 맞춰진다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, ":");

      expect(document.activeElement).toEqual($input);
    });
  });

  describe("편집기 내용이 변경되고 라인 모드로 전환했을 때", () => {
    it("q를 입력하면 에러 메시지가 뜨고, 커서가 textarea로 맞춰진다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, "테스트");

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "q");
      await user.keyboard("{Enter}");

      expect($input).toHaveValue(
        "E37: No write since last change (add ! to override)",
      );
      expect(document.activeElement).toEqual($textarea);
      expect($input).toHaveAttribute("readonly");
    });

    it("q!를 입력하면 변경사항이 적용되지 않은 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      const mockFn = jest.fn();
      render(<Editor initialFile={mockData} onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, "테스트");

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "q!");
      await user.keyboard("{Enter}");

      expect(mockFn).toHaveBeenCalledWith(mockData);
    });

    it("wq를 입력하면 변경사항이 변경사항이 적용된 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      const CHANGED_FILE = "테스트";
      const mockFn = jest.fn();
      render(<Editor initialFile="" onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, CHANGED_FILE);

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "wq");
      await user.keyboard("{Enter}");

      expect(mockFn).toHaveBeenCalledWith(CHANGED_FILE);
    });

    it("wq!를 입력하면 변경사항이 변경사항이 적용된 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      const CHANGED_FILE = "테스트";
      const mockFn = jest.fn();
      render(<Editor initialFile="" onSubmit={mockFn} />);
      const user = userEvent.setup();
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, CHANGED_FILE);

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "wq!");
      await user.keyboard("{Enter}");

      expect(mockFn).toHaveBeenCalledWith(CHANGED_FILE);
    });
  });

  describe("편집기 내용이 변경이 되지 않았을 때 라인 모드로 전환했을 때", () => {
    it.each([
      { initialFile: mockData, input: "q", expected: mockData },
      { initialFile: mockData, input: "q!", expected: mockData },
      { initialFile: mockData, input: "wq", expected: mockData },
      { initialFile: mockData, input: "wq!", expected: mockData },
    ])(
      "$input를 입력했을 때 편집기 프로그램이 종료되고 초기 데이터가 서버에 전송된다",
      async ({ initialFile, input, expected }) => {
        const mockFn = jest.fn();
        render(<Editor initialFile={initialFile} onSubmit={mockFn} />);
        const user = userEvent.setup();
        const $textarea = screen.getByTestId("textarea");
        const $input = screen.getByTestId("input");

        await user.type($textarea, "i");

        await user.keyboard("{Escape}");

        await user.type($textarea, ":");

        await user.type($input, input);
        await user.keyboard("{Enter}");

        expect(mockFn).toHaveBeenCalledWith(expected);
      },
    );
  });
});
