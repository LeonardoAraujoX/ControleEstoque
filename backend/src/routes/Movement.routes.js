import express from "express";
import StockMovementController from "../controllers/StockMoviment-controller.js";

const router = express.Router();
const stockMovementController = new StockMovementController();

router
  .route("/movements")
  .get(stockMovementController.getAllMovements)
  .post(stockMovementController.createMovement);

router
  .route("/movements/:id")
  .get(stockMovementController.getMovementById)
  .put(stockMovementController.updateMovement)
  .delete(stockMovementController.deleteMovement);

// 🔁 Transferência de produto entre prateleiras
router.post("/movements/transfer", stockMovementController.transferProduct);

export default router;

