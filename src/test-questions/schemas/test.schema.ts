import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TestDocument = HydratedDocument<Test>;

@Schema()
export class Test {
  @Prop({ required: true })
  accordingToTest: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  options: [
    {
      option: string;
    }
  ];
}

export const TestSchema = SchemaFactory.createForClass(Test);
