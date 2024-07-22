export abstract class BaseException extends Error {
  public readonly statusCode: number;
  public readonly status: string;

  constructor(message: string, statusCode: number, status: string = "error") {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
