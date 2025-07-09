import { Request, Response } from "express";
import { Menu } from "../models/menu";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const { label, path, icon, roles } = req.body;

        const newMenu = new Menu({
            label,
            path,
            icon,
            roles,
            status: true
        });
        const menu = await newMenu.save();

        return res.status(201).json({ message: "Menú creado exitosamente", menu });
    } catch (error: any) {
        return res.status(400).json({ message: "Error al crear menú", error: error.message || error });
    }
};

export const getMenuRol = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;  
        const menus = await Menu.find({ "roles.type": type, status: true });

        console.log("Backend - Menus found for role:", type, "Count:", menus.length, "Data:", menus);

        return res.status(200).json({ message: "Menús encontrados", menus });
    } catch (error) {
        console.error("Backend - Error getting menus:", error); // Mejor log para errores
        return res.status(500).json({ message: "Error al obtener menús", error });
    }
};

export const deleteMenu = async (req:Request, res:Response) => {
    try {
        const { menuId } = req.params;
        const menu = await Menu.findById(menuId);
        if (!menu){
            return res.status(404).json({ message: "No existe la orden" });
        }

        menu.status = false;
        
        const deleteMenu = await menu.save();
        return res.status(201).json({ mesagge: "Orden dada de baja con exitó", deleteMenu });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la orden", error });
    }
};