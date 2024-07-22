import { User } from "../entities/user.entity";
import { AbstractRepository } from "./abstract/abstract.repository";

export class UserRepository extends AbstractRepository<User> {
  constructor() {
    super(User);
  }
}
