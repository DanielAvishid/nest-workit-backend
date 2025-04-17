import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(filterBy?: any): Promise<User[]> {
    let criteria = {};
    if (filterBy?.txt) {
      const regex = new RegExp(filterBy.txt, 'i');
      criteria = {
        $or: [
          { username: { $regex: regex } },
          { fullname: { $regex: regex } },
        ],
      };
    }
    return this.userModel.find(criteria).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new Error('Username taken');
    }
    
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
