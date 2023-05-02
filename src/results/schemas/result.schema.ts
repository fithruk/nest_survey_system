import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

export type ResultDocument = HydratedDocument<Result>;

@Schema()
export class Result {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  results: [{ title: string; value: string }];
  @Prop({ required: true })
  testName: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
