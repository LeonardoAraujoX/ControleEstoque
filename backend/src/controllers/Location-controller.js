import AppDataSource from "../config/data-source.js";
import { Location } from "../entities/Location.js";
import { Product } from "../entities/Product.js";

class LocationController {

  // 🔹 Listar todas as localizações
  async getAllLocations(req, res) {
    try {
      const locationRepository = AppDataSource.getRepository(Location);

      const locations = await locationRepository.find({
        relations: ["products"],
      });

      return res.status(200).json({
        message: "Localizações encontradas",
        locations,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar localizações",
        error: error.message,
      });
    }
  }

  // 🔹 Criar nova localização (prateleira)
  async createLocation(req, res) {
    try {
      const { code, description, qrCode } = req.body;

      const locationRepository = AppDataSource.getRepository(Location);

      const locationExists = await locationRepository.findOne({
        where: [{ code }, { qrCode }],
      });

      if (locationExists) {
        return res.status(400).json({
          message: "Código ou QR Code já cadastrados",
        });
      }

      const location = locationRepository.create({
        code,
        description,
        qrCode,
      });

      await locationRepository.save(location);

      return res.status(201).json({
        message: "Localização criada com sucesso",
        location,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar localização",
        error: error.message,
      });
    }
  }

  // 🔹 Buscar localização por ID
  async getLocationById(req, res) {
    try {
      const { id } = req.params;

      const locationRepository = AppDataSource.getRepository(Location);

      const location = await locationRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["products"],
      });

      if (!location) {
        return res.status(404).json({
          message: "Localização não encontrada",
        });
      }

      return res.status(200).json({ location });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar localização",
        error: error.message,
      });
    }
  }

  // 🔹 Atualizar localização
  async updateLocation(req, res) {
    try {
      const { id } = req.params;
      const { code, description, qrCode } = req.body;

      const locationRepository = AppDataSource.getRepository(Location);

      const location = await locationRepository.findOneBy({
        id: parseInt(id),
      });

      if (!location) {
        return res.status(404).json({
          message: "Localização não encontrada",
        });
      }

      location.code = code ?? location.code;
      location.description = description ?? location.description;
      location.qrCode = qrCode ?? location.qrCode;

      await locationRepository.save(location);

      return res.status(200).json({
        message: "Localização atualizada com sucesso",
        location,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar localização",
        error: error.message,
      });
    }
  }

  // 🔹 Deletar localização
  async deleteLocation(req, res) {
    try {
      const { id } = req.params;

      const locationRepository = AppDataSource.getRepository(Location);

      const location = await locationRepository.findOneBy({
        id: parseInt(id),
      });

      if (!location) {
        return res.status(404).json({
          message: "Localização não encontrada",
        });
      }

      await locationRepository.delete(location.id);

      return res.status(200).json({
        message: "Localização deletada com sucesso",
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar localização",
        error: error.message,
      });
    }
  }

  // 🔹 BUSCA POR QR CODE → retorna produtos da prateleira
  async getProductsByQrCode(req, res) {
    try {
      const { qrCode } = req.params;

      const locationRepository = AppDataSource.getRepository(Location);

      const location = await locationRepository.findOne({
        where: { qrCode },
        relations: ["products"],
      });

      if (!location) {
        return res.status(404).json({
          message: "Localização não encontrada para este QR Code",
        });
      }

      return res.status(200).json({
        location: {
          id: location.id,
          code: location.code,
          description: location.description,
        },
        products: location.products,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar produtos pelo QR Code",
        error: error.message,
      });
    }
  }
}

export default LocationController;
