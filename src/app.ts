import express, { Express } from "express";
import Database from "./configurations/db.config";
import { errorHandler } from "./middlewares/error.middleware";
import { UserRoute } from "./routes/user.route";

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middleware();
    this.configureRoutes();
    this.server.use(errorHandler);
  }

  private middleware(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  configureRoutes(): void {
    this.server.get("/", (req, res) => {
      res.send("Hello, World!");
    });
    const userRoutes = new UserRoute();
    this.server.use("/users", userRoutes.router);
  }

  async configureDatabase(): Promise<void> {
    try {
      await Database.getInstance().getSequelize().sync({ force: false });
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error("Failed to synchronize the database:", error);
      process.exit(1);
    }
  }

  async listen(port: number): Promise<void> {
    this.server.listen(port, () => {
      console.log(`Server running on port number: ${port}`);
    });
  }
}

(async () => {
  const app = new App();
  await app.configureDatabase();
  await app.listen(8080);
})();
