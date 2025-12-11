import express from "express";
import ProductController from "../controllers/Product-controller.js";

const router = express.Router();
const productController = new ProductController();

router
  .route("/")
  .get(productController.getAllProducts) // Listar todos os produtos
  .post(productController.createProduct); // Criar novo produto

router
  .route("/:id")
  .get(productController.getProductById) // Obter produto por ID
  .put(productController.updateProduct) // Atualizar produto por ID
  .delete(productController.deleteProduct); // Deletar produto por ID

export default router;