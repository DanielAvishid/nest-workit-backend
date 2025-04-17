export class CreateBoardDto {
  title: string;
  description?: string;
  isStarred?: boolean;
  archivedAt?: number;
  createdBy?: any;
  style?: any;
  statusLabels?: any[];
  priorityLabels?: any[];
  groups?: any[];
  activities?: any[];
  members?: any[];
  cmpsOrder?: any[];
}

export class UpdateBoardDto {
  title?: string;
  description?: string;
  isStarred?: boolean;
  archivedAt?: number;
  style?: any;
  statusLabels?: any[];
  priorityLabels?: any[];
  groups?: any[];
  activities?: any[];
  members?: any[];
  cmpsOrder?: any[];
}
