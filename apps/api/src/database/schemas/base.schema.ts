import { Prop } from '@nestjs/mongoose';

export abstract class BaseSchema {
  @Prop({
    default: false,
  })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;

  @Prop()
  deletedBy?: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}