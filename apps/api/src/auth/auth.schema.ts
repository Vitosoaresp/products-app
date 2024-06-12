import { ApiProperty } from "@nestjs/swagger";
import { Signin, SigninResponse, UserDto } from "@products-app/schemas";
import { UserSchema } from "../user/user.schema";

export class AuthSignInDto implements Signin {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}

export class AuthSignInResponse implements SigninResponse {
  @ApiProperty()
  user: UserSchema;

  @ApiProperty()
  token: string;
}

export class AuthRegisterDto implements UserDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty()
  name: string;
}

export class AuthMeResponse {
  @ApiProperty()
  user: UserSchema;
}
