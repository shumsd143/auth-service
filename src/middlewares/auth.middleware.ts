import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../common/exceptions/common.exception";
import { JWT_SECRET_KEY } from "../common/constants/env.constant";
import { AuthRequest } from "../common/types/requests/auth-request.type";

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return new UnauthorizedException("Invalid token");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    return new UnauthorizedException("Invalid token");
  }
}
