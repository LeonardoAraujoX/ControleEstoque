import express from "express";
import UserController from "../controllers/User-controller.js";

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers) //Listar todos os usuários
  .post(UserController.registerUser); //Registrar novo usuário

router
  .route("/:id")
  .get(UserController.getUserById) //Obter usuário por ID
  .put(UserController.updateUser) //Atualizar usuário por ID
  .delete(UserController.deleteUser); //Deletar usuário por ID

router.route("/login").post(UserController.loginUser); //Login do usuário

router.route("/password-reset").post(UserController.resetPassword); //Resetar senha do usuário

export default router;