import { hash_string } from "../common/utils";
import { User } from "../entities/user.entity";

export class UserBuilder {
  private name: string = "";
  private email: string = "";
  private phone: string = "";
  private password: string = "";

  setName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  setPhone(phone: string): UserBuilder {
    this.phone = phone;
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.password = hash_string(password);
    return this;
  }

  build(): User {
    return User.build({
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
    });
  }
}
