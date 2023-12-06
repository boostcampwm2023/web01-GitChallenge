export class SolvedDto {
  [key: number]: boolean;

  constructor() {
    for (let i = 1; i <= 19; i++) {
      this[i] = false;
    }
  }
}
