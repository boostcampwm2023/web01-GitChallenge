export class CommandResponseDto {
  message: string;
  result: 'success' | 'fail' | 'vi';
  graph?: string;
}
