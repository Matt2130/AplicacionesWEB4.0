import { Request, Response } from "express";
import { generateAccessToken, validateToken } from "../utils/token";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User"
import bcrypt from "bcrypt";

export const loginMethod = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Buscar usuario en Mongo por username
    const user = await User.findOne({ username });

    // Si no existe usuario o la contraseña no coincide
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Crear token
    const userId = user._id.toString();
    const accessToken = generateAccessToken(userId);

    // Guardar token en cache
    cache.set(userId, accessToken, 60 * 15);

    // Retornar token
    return res.json({ accessToken });
};

export const getTimeToken = (req: Request, res: Response) => {
    try {
        // Obtener y validar token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Token requerido');
        
        const userId = validateToken(token);

        const ttl = cache.getTtl(userId);
        if (!ttl) throw new Error('Token expirado');

        const now = Date.now();
        const timeToLife = Math.floor((ttl - now) / 1000);
        const expTime = dayjs(ttl).format('HH:mm:ss');

        return res.json({ 
            creadoPor: userId,  // Aquí va quién creó el token
            timeToLife,
            expTime 
        });

    } catch (error) {
        return res.status(401).json({ 
            message: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    const { userUsername } = req.query;

    const userList = await User.find(); //Mostrar todos los usuarios
    const userByUsername = await User.find({ username: userUsername }); //Econtrar por email

    console.log(userByUsername);
    return res.json({ userList });
};

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }); // Mi función para buscar por username

        // condición en caso que no exista
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Si se encuentra, devolverlo
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: "Error al buscar usuario", error });
    }
};

export const updateToken = (req: Request, res: Response) => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId); //Tiempo de vida del token
    if (!ttl){
        return res.status(404).json({
            message: "Token invalido o no existe"
        });
    }

    const newTimeToken: number = 60 * 15;
    cache.ttl(userId, newTimeToken);
     //Actualizar el tiempo de vida

    res.json({ message: "Update"});
};

export const saveUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;

        // Se genera el salt para la encriptación
        const salt = await bcrypt.genSalt(10);
        // crear la función
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword, 
            role
        });

        const user = await newUser.save();

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear usuario",
            error
        });
    }
};

export const updateUser = async (req: Request, res:Response) => {
    const { userId } = req.params;
    const { email, password, firstName, lastName, role } = req.body;


    const salt = await bcrypt.genSalt(10);
        // crear la función
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({ message: "Usuario no encontrado"});
    }
    const userEmail = await User.findOne({email});
    if (userEmail&&userEmail.id.toString() !== userId){
        return res.status(426).json({ message: "El correo ya esta registrado"})
    }

    user.password = hashedPassword != null ? hashedPassword : user.password
    user.email = email;
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;

    const updateUser = await user.save();
    return res.status(201).json({ mesagge: "Usuario actualizado con exitó", updateUser })
};

export const deleteUser = async (req:Request, res:Response) => {
    const { userId } = req.params;
    const { email, password, firstName, lastName, role } = req.params;

    const user = await User.findById(userId);
    if (!user){
        return res.status(404).json({ message: "Usuario no existe" });
    }

    user.status = false;
    user.deleteDate = new Date;

    const deleteUser = await user.save();
    return res.status(201).json({ mesagge:"Usuario dado de baja con exitó", deleteUser });
};