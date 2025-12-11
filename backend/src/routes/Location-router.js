import express from "express";
import LocationController from "../controllers/Location-controller.js";

const router = express.Router();
const locationController = new LocationController();

router
  .route("/")
  .get(locationController.getAllLocations) // Listar todas as localizações
  .post(locationController.createLocation); // Criar nova localização

router
  .route("/:id")
  .get(locationController.getLocationById) // Obter localização
  .put(locationController.updateLocation) // Atualizar localização
  .delete(locationController.deleteLocation); // Deletar localização

export default router;
