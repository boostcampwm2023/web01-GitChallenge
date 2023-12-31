import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from "@testing-library/user-event";

import { Editor, EditorProps } from "../Editor";
import "@testing-library/jest-dom";

const mockInitialFileData = `
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

function renderComponent({ initialFile, onSubmit }: EditorProps) {
  render(<Editor initialFile={initialFile} onSubmit={onSubmit} />);
}

afterEach(() => {
  jest.clearAllMocks();
});

describe("Editor", () => {
  const mockSubmitHandler = jest.fn();
  const user = userEvent.setup();

  describe("초기 데이터가 전달되면", () => {
    it("편집기에 전달받은 초기 데이터를 보여준다.", () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      expect(screen.getByTestId("textarea")).toHaveValue(mockInitialFileData);
    });

    it("편집기는 명령 모드로 textarea에 입력이 안된다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      await user.type(
        screen.getByTestId("textarea"),
        "이 값을 타이핑해도 TextArea의 값이 바뀌지 않아야함.",
      );

      expect(screen.getByTestId("textarea")).toHaveValue(mockInitialFileData);
    });

    it("편집기의 명령 모드로 명령어 입력 input에도 입력이 되지 않는다.", () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });

      expect(screen.getByTestId("input")).toHaveAttribute("readonly");
    });
  });

  describe("명령 모드에서 i를 누르면", () => {
    it("편집기는 입력모드로 textarea에 입력이 가능하다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      await user.type($textarea, "테스트");

      expect($textarea).not.toHaveValue(mockInitialFileData);
    });

    it("편집기의 textarea에 커서가 포커싱 되어야 한다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      expect($textarea).toHaveFocus();
    });

    it('편집기는 입력모드로 input에는 "-- INSERT --" 이 입력 된다.', async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      const $input = screen.getByTestId("input");

      expect($input).toHaveValue("-- INSERT --");
    });

    it("편집기는 입력모드로 input은 입력이 되지 않는다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");
      const $input = screen.getByTestId("input");
      await user.type($input, "테스트");

      expect($input).toHaveValue("-- INSERT --");
    });
  });

  describe("명령 모드에서 :(콜론)을 누르면 편집기는 라인 모드로 전환되며", () => {
    it("편집기의 textarea는 입력이 불가능하다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, ":");

      expect($textarea).toHaveValue(mockInitialFileData);
    });

    it("편집기의 input에는 초기값이 :(콜론)으로 들어간다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, ":");

      expect($input).toHaveValue(":");
    });

    it("편집기의 input에 포커싱이 맞춰진다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, ":");

      expect($input).toHaveFocus();
    });
  });

  describe("입력 모드에서 esc를 누르면", () => {
    it("편집기는 명령모드로 input은 빈 값이다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");

      expect($input).toHaveValue("");
    });

    it("편집기는 명령모드로 textarea에 커서가 포커싱 되어야 한다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");
      expect($textarea).toHaveFocus();
    });

    it("편집기는 명령모드로 textarea에 입력이 되지 않는다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      await user.type($textarea, "i");

      await user.keyboard("{Escape}");

      await user.type($textarea, "테스트");
      expect($textarea).toHaveValue(mockInitialFileData);
    });
  });

  describe("편집기 내용이 변경되고 라인 모드로 전환했을 때", () => {
    it("q를 입력하면 에러 메시지가 뜨고, 커서가 textarea로 맞춰진다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
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
      expect($textarea).toHaveFocus();
      expect($input).toHaveAttribute("readonly");
    });

    it("q!를 입력하면 변경사항이 적용되지 않은 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      renderComponent({
        initialFile: mockInitialFileData,
        onSubmit: mockSubmitHandler,
      });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, "테스트");

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "q!");
      await user.keyboard("{Enter}");

      expect(mockSubmitHandler).toHaveBeenCalledWith(mockInitialFileData);
    });

    it("wq를 입력하면 변경사항이 변경사항이 적용된 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      const CHANGED_FILE = "테스트";
      renderComponent({ initialFile: "", onSubmit: mockSubmitHandler });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, CHANGED_FILE);
      expect($textarea).toHaveValue(CHANGED_FILE);

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "wq");
      await user.keyboard("{Enter}");

      expect(mockSubmitHandler).toHaveBeenCalledWith(CHANGED_FILE);
    });

    it("wq!를 입력하면 변경사항이 변경사항이 적용된 상태로 onSubmit 함수를 실행시키고 종료된다.", async () => {
      const CHANGED_FILE = "테스트";
      renderComponent({ initialFile: "", onSubmit: mockSubmitHandler });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");

      await user.type($textarea, "i");
      await user.type($textarea, CHANGED_FILE);

      await user.keyboard("{Escape}");

      await user.type($textarea, ":");

      await user.type($input, "wq!");
      await user.keyboard("{Enter}");

      expect(mockSubmitHandler).toHaveBeenCalledWith(CHANGED_FILE);
    });
  });

  describe("편집기 내용이 변경이 되지 않았을 때 라인 모드로 전환했을 때", () => {
    it.each([
      {
        initialFile: mockInitialFileData,
        input: "q",
        expected: mockInitialFileData,
      },
      {
        initialFile: mockInitialFileData,
        input: "q!",
        expected: mockInitialFileData,
      },
      {
        initialFile: mockInitialFileData,
        input: "wq",
        expected: mockInitialFileData,
      },
      {
        initialFile: mockInitialFileData,
        input: "wq!",
        expected: mockInitialFileData,
      },
    ])(
      "$input를 입력했을 때 편집기 프로그램이 종료되고 초기 데이터가 서버에 전송된다",
      async ({ initialFile, input, expected }) => {
        renderComponent({
          initialFile,
          onSubmit: mockSubmitHandler,
        });
        const $textarea = screen.getByTestId("textarea");
        const $input = screen.getByTestId("input");

        await user.type($textarea, "i");

        await user.keyboard("{Escape}");

        await user.type($textarea, ":");

        await user.type($input, input);
        await user.keyboard("{Enter}");

        expect(mockSubmitHandler).toHaveBeenCalledWith(expected);
      },
    );
  });

  describe("라인 모드에서", () => {
    it.each([["wwq"], ["w"], ["ㅈㅂ"], ["ㅂ"], ["wq!!"], [":"]])(
      "지원하지 않는 명령어 %s를 입력하면 에러 메시지가 표시되고 명령 모드로 전환된다.",
      async (input) => {
        renderComponent({
          initialFile: mockInitialFileData,
          onSubmit: mockSubmitHandler,
        });
        const $textarea = screen.getByTestId("textarea");
        const $input = screen.getByTestId("input");

        await user.type($textarea, ":");

        await user.type($input, input);
        await user.keyboard("{Enter}");

        expect($input).toHaveValue(`E492: Not an editor command: ${input}`);
        expect($input).toHaveAttribute("readonly");
        expect($textarea).toHaveFocus();
        expect(mockSubmitHandler).toHaveBeenCalledTimes(0);
      },
    );

    it.each([[" ", "  "]])(
      "빈 값을 입력하면 명령 모드로 전환된다.",
      async (input) => {
        renderComponent({
          initialFile: mockInitialFileData,
          onSubmit: mockSubmitHandler,
        });
        const $textarea = screen.getByTestId("textarea");
        const $input = screen.getByTestId("input");

        await user.type($textarea, ":");

        await user.type($input, input);
        await user.keyboard("{Enter}");

        expect($input).toHaveValue(":");
        expect($input).toHaveAttribute("readonly");
        expect($textarea).toHaveFocus();
        expect(mockSubmitHandler).toHaveBeenCalledTimes(0);
      },
    );
  });

  describe("라인 모드에서 명령 모드로 전환했을 때", () => {
    it("textarea에 커서가 맞춰진다.", async () => {
      renderComponent({ initialFile: "", onSubmit: mockSubmitHandler });
      const $textarea = screen.getByTestId("textarea");

      await user.type($textarea, ":");
      expect($textarea).not.toHaveFocus();

      await user.keyboard("{Escape}");
      expect($textarea).toHaveFocus();
    });

    it("input은 값이 비워진다.", async () => {
      renderComponent({ initialFile: "", onSubmit: mockSubmitHandler });
      const $textarea = screen.getByTestId("textarea");
      const $input = screen.getByTestId("input");
      await user.type($textarea, ":");
      await user.keyboard("{Escape}");

      expect($input).toHaveValue("");
    });
  });
});
