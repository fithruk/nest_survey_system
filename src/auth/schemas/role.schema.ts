import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";

export type RoleDocument = HydratedDocument<Role>;

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Schema()
export class Role {
  @Prop({ required: true })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: User;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
