import { UserBuilder } from "../builders/user.builder";
import jwt from "jsonwebtoken";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../common/exceptions/common.exception";
import { ChangePasswordRequest } from "../common/types/requests/change-password-request.type";
import { LoginRequest } from "../common/types/requests/login-request.type";
import { RegisterRequest } from "../common/types/requests/register-request.type";
import { UpdateProfileRequest } from "../common/types/requests/update-profile-request.type";
import { AuthResponse } from "../common/types/responses/auth-response.type";
import { compare_hashed_string, hash_string } from "../common/utils";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
} from "../common/constants/env.constant";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(userRequest: RegisterRequest) {
    const existingUser = await this.userRepository.findByField(
      "email",
      userRequest.email,
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    const userBuilder = new UserBuilder()
      .setName(userRequest.name)
      .setEmail(userRequest.email)
      .setPhone(userRequest.phone)
      .setPassword(userRequest.password);

    const user = await userBuilder.build().save();
    return user;
  }

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByField(
      "email",
      credentials.email,
    );

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (compare_hashed_string(user?.password, credentials.password)) {
      throw new UnauthorizedException("Invalid email or password");
    }
    // Assuming a token generation function is available
    return {
      token: this.generateToken(user),
    } as AuthResponse;
  }

  public async updateProfile(profileRequest: UpdateProfileRequest, id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.name = profileRequest.name ?? user.name;
    user.phone = profileRequest.phone ?? user.phone;

    return this.userRepository.update(user.id, user);
  }

  public async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    id: number,
  ) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userRepository.update(id, {
      password: hash_string(changePasswordRequest.newPassword),
    });
  }

  private generateToken(user: User): string {
    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return token;
  }
}
