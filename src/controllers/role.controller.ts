import { Request, Response } from "express";
import { Role } from "../models/role"

export const createRole = async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body;
        const newRole = new Role ({
            name,
            type
        });
        const role = await newRole.save();
        return res.status(201).json({ message:"Rol asignado con exitó", role });
    } catch (error) {
        return res.status(500).json({ message:"Error al asignar el rol", error });
    }
};

export const getRole = async (req: Request, res: Response) => {
    try {
        const roleList = await Role.find();
        return res.status(200).json({ message:"Roles del sistema", roleList }); 
    } catch (error) {
        return res.status(500).json({ message:"Error al buscar roles", error });
    }
}