import { Document, Schema, Types, model } from "mongoose";

export interface IOrder extends Document {
  _id: Types.ObjectId;
  IDUser: string;
  Date: Date;
  status: string;
}

const orderSchema = new Schema<IOrder>({
  IDUser: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  }
}, { versionKey: false });

export const Order = model<IOrder>("Order", orderSchema, "order");
