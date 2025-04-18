import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WebsocketGateway } from './board.gateway';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('boards')
@ApiBearerAuth('JWT-auth')
@Controller('api/board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @ApiOperation({ summary: 'Get all boards', description: 'Retrieves a list of all boards' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter boards by title' })
  @ApiResponse({ status: 200, description: 'List of boards retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBoards(@Query() query) {
    return this.boardService.findAll(query);
  }

  @ApiOperation({ summary: 'Get board by ID', description: 'Retrieves a specific board by ID' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardService.findById(id);
  }

  @ApiOperation({ summary: 'Create board', description: 'Creates a new board' })
  @ApiResponse({ status: 201, description: 'Board created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({ summary: 'Update board', description: 'Updates a board by ID and broadcasts changes via WebSocket' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Board not found' })
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

  @ApiOperation({ summary: 'Delete board', description: 'Deletes a board by ID' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeBoard(@Param('id') id: string) {
    await this.boardService.remove(id);
    return { success: true };
  }
}
