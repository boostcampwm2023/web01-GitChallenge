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
});
