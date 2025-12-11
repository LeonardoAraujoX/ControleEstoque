import express from "express";
import StockMovimentController from "../controllers/StockMoviment-controller.js";

const router = express.Router();
const stockMovimentController = new StockMovimentController();

router
  .route("/")
  .get(stockMovimentController.getAllStockMoviments) // Listar todos os movimentos de estoque
  .post(stockMovimentController.createStockMoviment); // Criar novo movimento de estoque

router
  .route("/:id")
  .get(stockMovimentController.getStockMovimentById) // Obter movimento de estoque por ID
  .put(stockMovimentController.updateStockMoviment) // Atualizar movimento de estoque por ID
  .delete(stockMovimentController.deleteStockMoviment); // Deletar movimento de estoque por ID

export default router;
