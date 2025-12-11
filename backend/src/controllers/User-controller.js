import { Response, Request } from "express";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserController =  {
    getAllUsers: async (req = Request, res = Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            
            res.status(200).json({ message: "Usuarios encontrado", users });

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuários", error });
        }
    },        

}

export default UserController;