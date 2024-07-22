import { NextFunction, Request, Response } from "express";
import { BaseException } from "../common/exceptions/base.exception";

export function errorHandler(
  err: Error | BaseException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred.",
  });
}
