import { Request, Response } from 'express';
import { Order } from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { IDUser, status, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Debe contener al menos un producto" })};
    
    const subTotal = products.reduce((acc: number, product: any) => {
      return acc + (product.quantity * product.price)}, 0); //función para calcular el subTotal

    const tax = 0.16;
    const importTotal = tax * subTotal;
    const total = subTotal + importTotal;

    const newOrder = new Order({
      IDUser,
      status,
      subTotal,
      total,
      products
    });
    const order = await newOrder.save();
        return res.status(201).json({ message: "Orden creada exitosamente", order });
  } catch (error) {
        return res.status(500).json({ message: "Error al crear orden", error });
  }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const orderList = await Order.find();
        return res.status(200).json({ message: "Ordenes del sistema", orderList});
    } catch (error) {
        return res.status(500).json({message: "Error al buscar las ordenes", error});
    }
};

export const updateOrder = async (req: Request, res:Response) => {
    try{
        const { orderId } = req.params;
        const { status/*, statusSystem*/ } = req.body;
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({ message: "Orden no encontrada"});
        };
        order.status = status;
        //order.statusSystem = statusSystem;
        const updateOrder = await order.save();
        return res.status(201).json({ mesagge: "Orden actualizada con exitó", updateOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar la orden", error });
    }
};

export const deleteOrder = async (req:Request, res:Response) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order){
            return res.status(404).json({ message: "No existe la orden" });
        }
        order.statusSystem = "Cancelado";
        order.updateDate = new Date;
        const deleteOrder = await order.save();
        return res.status(201).json({ mesagge: "Orden dada de baja con exitó", deleteOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la orden", error });
    }
};