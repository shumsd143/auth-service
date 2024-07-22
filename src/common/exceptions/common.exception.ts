import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor(message: string = "Not Found") {
    super(message, 404, "fail");
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string = "Bad Request") {
    super(message, 400, "fail");
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "fail");
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string = "Forbidden") {
    super(message, 403, "fail");
  }
}

export class InternalServerErrorException extends BaseException {
  constructor(message: string = "Internal Server Error") {
    super(message, 500, "error");
  }
}
