import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  fullname: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL to user avatar', required: false })
  imgUrl?: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username', required: false })
  username?: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name', required: false })
  fullname?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL to user avatar', required: false })
  imgUrl?: string;
}
