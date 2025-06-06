import { Response, Request } from "express";
import { Product } from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, qty, status, description, createDate, deleteDate} = req.body; 
        const newProduct = new Product ({
            name, 
            price, 
            qty, 
            status, 
            description, 
            createDate, 
            deleteDate
        });
        const product = await newProduct.save();
        return res.status(201).json({ message:"Producto resgistrado con exitó", product })
    } catch (error) {
        return res.status(500).json({ message:"Error al registrar el prodcuto", error })
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productList = await Product.find();
        return res.status(200).json({ message:"Productos del sistema", productList });
    } catch (error) {
        return res.status(500).json({ message:"Error al buscar los productos", error});
    }
};