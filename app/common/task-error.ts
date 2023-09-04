export class TaskError extends Error {
  constructor(code?: string, message?: string) {
    super(message);
    this.code = code;
    this.name = 'TaskError';
  }
  code?: string;
}
