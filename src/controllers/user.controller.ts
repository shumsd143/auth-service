import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../common/types/requests/auth-request.type";
import { RegisterRequest } from "../common/types/requests/register-request.type";
import { LoginRequest } from "../common/types/requests/login-request.type";
import { UpdateProfileRequest } from "../common/types/requests/update-profile-request.type";
import { ChangePasswordRequest } from "../common/types/requests/change-password-request.type";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const userRequest: RegisterRequest = req.body;
    await this.userService.register(userRequest);
    res.status(201).send("User created successfully");
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const loginRequest: LoginRequest = req.body;
    const token = await this.userService.login(loginRequest);
    res.status(200).json({ token });
  };

  public updateProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const updateProfileRequest: UpdateProfileRequest = req.body;
    await this.userService.updateProfile(
      updateProfileRequest,
      req.user_id || 0,
    );
    res.status(200).json({ message: "Profile updated successfully" });
  };

  public changePassword = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const changePasswordRequest: ChangePasswordRequest = req.body;
    await this.userService.changePassword(
      changePasswordRequest,
      req.user_id || 0,
    );
    res.status(200).json({ message: "Password changed successfully" });
  };
}
