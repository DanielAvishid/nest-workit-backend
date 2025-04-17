export class CreateUserDto {
  username: string;
  password: string;
  fullname: string;
  imgUrl?: string;
}

export class UpdateUserDto {
  username?: string;
  fullname?: string;
  imgUrl?: string;
}
