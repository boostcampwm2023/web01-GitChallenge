import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
  // @Prop({ required: true })
  // createdAt: Date;
  //
  // @Prop({ required: true })
  // updatedAt: Date;

  @Prop()
  deletedAt: Date | null;

  @Prop({
    required: true,
    type: Map,
    of: {
      status: { type: String, required: true },
      logs: { type: [String], required: true },
      containerId: { type: String, default: '' },
    },
  })
  problems: Map<
    string,
    {
      status: string;
      logs: string[];
      containerId: string;
    }
  >;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
