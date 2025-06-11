import { Document, Schema, Types, model } from "mongoose";

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string;
  type: "Administrador" | "Cliente" | "Empleado";
  status: boolean;
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Administrador", "Cliente", "Empleado"],
    default: "Cliente"
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
}, { versionKey: false });

export const Role = model<IRole>("Role", roleSchema, "role");