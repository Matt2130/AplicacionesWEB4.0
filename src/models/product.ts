import { Document, Schema, Types, model } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  status: boolean;
  description: string;
  createDate: Date;
  deleteDate?: Date | null;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  deleteDate: {
    type: Date,
    default: null
  }
}, { versionKey: false });

export const Product = model<IProduct>("Product", productSchema, "product");