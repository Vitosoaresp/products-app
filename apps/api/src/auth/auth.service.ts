import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Signin, SigninResponse, User, UserDto } from "@products-app/schemas";
import { UserService } from "../user/user.service";
import { compare } from "../utils/bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async signin(payload: Signin): Promise<SigninResponse> {
    const user = await this._userService.findOne(payload.email);
    const isSamePassword = await compare(payload.password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this._jwtService.sign({ id: user._id, email: user.email });

    user.password = undefined;

    return {
      user,
      token,
    };
  }

  async register(data: UserDto): Promise<User> {
    const user = await this._userService.create(data);
    delete user.password;
    return user;
  }
}
