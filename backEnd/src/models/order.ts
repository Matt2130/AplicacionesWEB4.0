import { Document, Schema, Types, model } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
};

export interface IOrder extends Document {
  _id: Types.ObjectId;
  IDUser: string;
  subTotal: number;
  total: number;
  status: "Pendiente" | "Pagado";
  statusSystem: "Activo" | "Cancelado";
  createDate: Date;
  updateDate: Date;
  products: IOrderProduct[];
};

  const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity:{
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    } 
}, { _id: false});

const orderSchema = new Schema<IOrder>({
  IDUser: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: [ "Pendiente", "Pagado" ],
    default: "Pendiente"
  },
  statusSystem: {
    type: String,
    enum: [ "Activo", "Cancelado" ],
    default: "Activo"
  },
  subTotal:{
    type: Number
  },
  total:{
    type: Number
  },
  products: {
    type: [orderProductSchema],
    required: true,
    validate: [(array: string | any[]) => array.length > 0, 'Debe contener al menos un producto']
  }
}, { versionKey: false });

export const Order = model<IOrder>("Order", orderSchema, "order");
