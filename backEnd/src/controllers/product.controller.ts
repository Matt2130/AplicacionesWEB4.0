import { Response, Request } from "express";
import { Product } from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, quantity, status, description, createDate, deleteDate} = req.body;
        const newProduct = new Product ({
            name, 
            price,
            quantity, 
            description
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

export const updateProducts = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        const { price, quantity, status, description } = req.body;

        const product = await Product.findById(productID);
        if(!product){
            return res.status(404).json({ message: "Producto no encontrado" });
        };
        
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (status !== undefined) product.status = status;
    if (description !== undefined) product.description = description;
        
        const saveProduct = await product.save();
        return res.status(200).json({ message: "Producto actualizado con exitó", saveProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error interno", error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        
        const product = await Product.findById(productID);
        if (!product){
            return res.status(404).json({ message: "Producto no encontrado "});
        };

        product.status = false;
        product.deleteDate = new Date; 

        const saveProduct = await product.save();
        return res.status(200).json({ message: "Producto dado de baja con exitó", saveProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error interno", error })

    }
};