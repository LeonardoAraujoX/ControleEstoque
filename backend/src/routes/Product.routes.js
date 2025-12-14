import express from "express";
import ProductController from "../controllers/Product-controller.js";

const router = express.Router();

// Rota para listar e criar produtos
router
  .route("/")
  .get((req, res) => ProductController.getAllProducts(req, res))
  .post((req, res) => ProductController.createProduct(req, res));

// Rota para operações por ID
router
  .route("/:id")
  .get((req, res) => ProductController.getProductById(req, res))
  .put((req, res) => ProductController.updateProduct(req, res))
  .delete((req, res) => ProductController.deleteProduct(req, res));

export default router;
