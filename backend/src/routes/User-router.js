import express from "express";
import UserController from "../controllers/User-controller.js";

const router = express.Router();
const userController = new UserController();

router
  .route("/")
  .get(userController.getAllUsers) //Listar todos os usuários
  .post(userController.registerUser); //Registrar novo usuário

router
  .route("/:id")
  .get(userController.getUserById) //Obter usuário por ID
  .put(userController.updateUser) //Atualizar usuário por ID
  .delete(userController.deleteUser); //Deletar usuário por ID

router.route("/login").post(userController.loginUser); //Login do usuário

router.route("/password-reset").post(userController.resetPassword); //Resetar senha do usuário

export default router;