import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const Action = {
  Command: 'command',
  Editor: 'editor',
} as const;

export type ActionType = (typeof Action)[keyof typeof Action];

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop()
  deletedAt: Date | null;

  @Prop({
    required: true,
    type: Map,
    of: {
      status: { type: String, required: true },
      logs: {
        type: [
          {
            mode: { type: String, enum: Object.values(Action), required: true },
            message: { type: String, required: true },
          },
        ],
        required: true,
      },
      containerId: { type: String, default: '' },
      graph: { type: String, default: '' },
      ref: { type: String, default: '' },
    },
  })
  problems: Map<
    number,
    {
      status: string;
      logs: {
        mode: ActionType;
        message: string;
      }[];
      containerId: string;
      graph: string;
      ref: string;
    }
  >;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
