export type CommandSuccess = "success";
export type CommandFail = "fail";
export type CommandVI = "vi";

export type Command = {
  message: string;
  result: CommandSuccess | CommandFail | CommandVI;
  graph?: string;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  category: string;
};

export type Quizzes = {
  id: number;
  category: string;
  quizzes: {
    id: number;
    title: string;
  }[];
}[];

export type Categories = {
  categories: Quizzes;
};

export type QuizSolve = QuizSolveCorrect | QuizSolveWrong;

export type QuizSolveCorrect = {
  solved: true;
  link: string;
};

export type QuizSolveWrong = {
  solved: false;
};
