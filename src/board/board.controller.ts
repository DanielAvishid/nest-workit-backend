import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WebsocketGateway } from './board.gateway';

@Controller('api/board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBoards(@Query() query) {
    return this.boardService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto, @Req() req) {
    const updatedBoard = await this.boardService.update(id, updateBoardDto);
    this.websocketGateway.broadcast({
      type: 'change-board',
      data: updatedBoard,
      room: id || null,
      userId: req.user.userId,
    });
    return updatedBoard;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeBoard(@Param('id') id: string) {
    await this.boardService.remove(id);
    return { success: true };
  }
}
