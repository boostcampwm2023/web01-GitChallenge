export type CommandSuccess = "success";
export type CommandFail = "fail";
export type CommandEditor = "editor";

export type Command = {
  message: string;
  result: CommandSuccess | CommandFail | CommandEditor;
  graph?: string;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  answer: string[];
};

export type SharedQuiz = Omit<Quiz, "answer">;

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
  slug: string;
};

export type QuizSolveWrong = {
  solved: false;
};
