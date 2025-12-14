import AppDataSource from "../config/data-source.js";
import { User } from "../entities/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserController = {
    // LISTAR TODOS
    getAllUsers: async (req, res) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();

            return res.status(200).json({
                message: "Usuários encontrados",
                users,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar usuários",
                error,
            });
        }
    },

    // REGISTRAR USUÁRIO
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userRepository = AppDataSource.getRepository(User);

            const exists = await userRepository.findOne({ where: { email } });

            if (exists) {
                return res.status(400).json({
                    message: "Já existe um usuário com esse e-mail.",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User();
            user.name = name;
            user.email = email;
            user.password = hashedPassword;

            await userRepository.save(user);

            return res.status(201).json({
                message: "Usuário registrado com sucesso!",
                user,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao registrar usuário",
                error: error.message,
            });
        }
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado",
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    message: "Senha incorreta",
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                "secretkey",
                { expiresIn: "2h" }
            );

            return res.status(200).json({
                message: "Login realizado com sucesso!",
                token,
                user,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro no login",
                error,
            });
        }
    },

    // BUSCAR POR ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOneBy({ id: parseInt(id) });

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado",
                });
            }

            return res.status(200).json({ user });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar usuário",
                error,
            });
        }
    },

    // ATUALIZAR USUÁRIO
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: parseInt(id) });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            user.name = name ?? user.name;
            user.email = email ?? user.email;

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            await userRepository.save(user);

            return res.status(200).json({
                message: "Usuário atualizado com sucesso",
                user,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar usuário",
                error,
            });
        }
    },

    // DELETAR
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: parseInt(id) });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await userRepository.delete(user);

            return res.status(200).json({
                message: "Usuário deletado com sucesso",
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar usuário",
                error,
            });
        }
    },

    // RESET DE SENHA
    resetPassword: async (req, res) => {
        try {
            const { email, newPassword } = req.body;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado",
                });
            }

            user.password = await bcrypt.hash(newPassword, 10);

            await userRepository.save(user);

            return res.status(200).json({
                message: "Senha redefinida com sucesso!",
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao resetar senha",
                error,
            });
        }
    },
};

export default UserController;
