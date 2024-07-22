import { Sequelize } from "sequelize-typescript";
import { User } from "../entities/user.entity";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "../common/constants/env.constant";

// Singleton Pattern
class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: "mysql",
      host: DATABASE_HOST,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      logging: false,
      models: [User],
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public close(): void {
    this.sequelize.close();
  }
}

export default Database;
