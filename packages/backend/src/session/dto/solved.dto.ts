const QUIZ_COUNT = 19;
export class SolvedDto {
  [key: number]: boolean;

  constructor() {
    for (let i = 1; i <= QUIZ_COUNT; i++) {
      this[i] = false;
    }
  }
}
