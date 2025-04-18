import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: 'Project Alpha', description: 'Board title' })
  title: string;

  @ApiProperty({ example: 'This is a project board for Alpha team', description: 'Board description', required: false })
  description?: string;

  @ApiProperty({ example: false, description: 'Whether the board is starred', required: false })
  isStarred?: boolean;

  @ApiProperty({ example: null, description: 'Timestamp when the board was archived', required: false })
  archivedAt?: number;

  @ApiProperty({ description: 'User who created the board', required: false })
  createdBy?: any;

  @ApiProperty({ description: 'Board style settings', required: false })
  style?: any;

  @ApiProperty({ description: 'Status labels for tasks', type: [Object], required: false })
  statusLabels?: any[];

  @ApiProperty({ description: 'Priority labels for tasks', type: [Object], required: false })
  priorityLabels?: any[];

  @ApiProperty({ description: 'Groups within the board', type: [Object], required: false })
  groups?: any[];

  @ApiProperty({ description: 'Board activities log', type: [Object], required: false })
  activities?: any[];

  @ApiProperty({ description: 'Board members', type: [Object], required: false })
  members?: any[];

  @ApiProperty({ description: 'Component display order', type: [Object], required: false })
  cmpsOrder?: any[];
}

export class UpdateBoardDto {
  @ApiProperty({ example: 'Project Alpha', description: 'Board title', required: false })
  title?: string;

  @ApiProperty({ example: 'This is a project board for Alpha team', description: 'Board description', required: false })
  description?: string;

  @ApiProperty({ example: false, description: 'Whether the board is starred', required: false })
  isStarred?: boolean;

  @ApiProperty({ example: null, description: 'Timestamp when the board was archived', required: false })
  archivedAt?: number;

  @ApiProperty({ description: 'Board style settings', required: false })
  style?: any;

  @ApiProperty({ description: 'Status labels for tasks', type: [Object], required: false })
  statusLabels?: any[];

  @ApiProperty({ description: 'Priority labels for tasks', type: [Object], required: false })
  priorityLabels?: any[];

  @ApiProperty({ description: 'Groups within the board', type: [Object], required: false })
  groups?: any[];

  @ApiProperty({ description: 'Board activities log', type: [Object], required: false })
  activities?: any[];

  @ApiProperty({ description: 'Board members', type: [Object], required: false })
  members?: any[];

  @ApiProperty({ description: 'Component display order', type: [Object], required: false })
  cmpsOrder?: any[];
}
