import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/register", this.userController.register);
    this.router.post("/login", this.userController.login);
    this.router.put(
      "/update-profile",
      authMiddleware,
      this.userController.updateProfile,
    );
    this.router.put(
      "/change-password",
      authMiddleware,
      this.userController.changePassword,
    );
  }
}
