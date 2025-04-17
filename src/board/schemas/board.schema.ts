import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

class Activity {
  @Prop()
  id: string;

  @Prop()
  txt: string;

  @Prop()
  createdAt: number;

  @Prop({ type: Object })
  byMember: any;

  @Prop({ type: Object })
  task: any;
}

class Task {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop({ type: Object })
  status: any;

  @Prop({ type: Object })
  priority: any;

  @Prop()
  timeline: any;

  @Prop([Object])
  members: any[];

  @Prop()
  type: string;
}

class Group {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop([Object])
  tasks: Task[];

  @Prop()
  archivedAt: number;
}

@Schema()
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isStarred: boolean;

  @Prop()
  archivedAt: number;

  @Prop({ type: Object })
  createdBy: any;

  @Prop({ type: Object })
  style: any;

  @Prop([Object])
  statusLabels: any[];

  @Prop([Object])
  priorityLabels: any[];

  @Prop([Object])
  groups: Group[];

  @Prop([Object])
  activities: Activity[];

  @Prop([Object])
  members: any[];

  @Prop([Object])
  cmpsOrder: any[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
