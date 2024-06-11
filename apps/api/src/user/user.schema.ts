import { ApiProperty } from "@nestjs/swagger";
import { User, UserDto } from "@products-app/schemas";

export class UserSchemaDto implements UserDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty()
  name: string;
}

export class UserSchema extends UserSchemaDto implements User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;
}