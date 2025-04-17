import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './schemas/board.schema';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async findAll(filterBy?: any): Promise<Board[]> {
    let criteria = {};
    if (filterBy?.title) {
      criteria = { title: { $regex: filterBy.title, $options: 'i' } };
    }
    return this.boardModel.find(criteria).exec();
  }

  async findById(id: string): Promise<Board | null> {
    return this.boardModel.findById(id).exec();
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    return createdBoard.save();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board | null> {
    return this.boardModel
      .findByIdAndUpdate(id, updateBoardDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.boardModel.findByIdAndDelete(id).exec();
  }
}
