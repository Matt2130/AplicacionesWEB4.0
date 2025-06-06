import { Request, Response } from 'express';
import { Order } from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { IDUser, status } = req.body;
        const newOrder = new Order({ 
            IDUser, 
            status 
        });
        const order = await newOrder.save();
        return res.status(201).json({ message:"Orden creada exitosamente", order });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear usuario", error });
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