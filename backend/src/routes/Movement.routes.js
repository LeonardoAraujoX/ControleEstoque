import express from "express";
import StockMovementController from "../controllers/StockMoviment-controller.js";

const router = express.Router();
const stockMovementController = new StockMovementController();

router
  .route("/movements")
  .get((req, res) => stockMovementController.getAllMovements(req, res))
  .post((req, res) => stockMovementController.createMovement(req, res));

router
  .route("movements/:id")
  .get((req, res) => stockMovementController.getMovementById(req, res))
  .put((req, res) => stockMovementController.updateMovement(req, res))
  .delete((req, res) => stockMovementController.deleteMovement(req, res));

export default router;

