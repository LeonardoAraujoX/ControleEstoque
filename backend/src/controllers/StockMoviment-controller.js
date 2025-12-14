import AppDataSource from "../config/data-source.js";
import { StockMovement } from "../entities/StockMovement.js";
import { Product } from "../entities/Product.js";

class StockMovementController {

    async getAllMovements(req, res) {
        try {
            const movementRepository = AppDataSource.getRepository(StockMovement);
            const movements = await movementRepository.find({
                relations: ["product"]
            });

            res.status(200).json({ message: "Movimentações encontradas", movements });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar movimentações", error });
        }
    }

    async createMovement(req, res) {
        try {
            const { productId, type, quantity } = req.body;

            const movementRepository = AppDataSource.getRepository(StockMovement);
            const productRepository = AppDataSource.getRepository(Product);

            const product = await productRepository.findOne({
                where: { id: productId }
            });

            if (!product) {
                return res.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            const movement = new StockMovement();
            movement.product = product;
            movement.type = type;
            movement.quantity = quantity;
            movement.created_at = new Date();

            if (type === "entrada") {
                product.quantity += quantity;
            } else if (type === "saida") {
                if (product.quantity < quantity) {
                    return res.status(400).json({
                        message: "Quantidade insuficiente no estoque."
                    });
                }
                product.quantity -= quantity;
            }

            await movementRepository.save(movement);
            await productRepository.save(product);

            return res.status(201).json({
                message: "Movimentação registrada com sucesso!",
                movement,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao registrar movimentação",
                error: error.message,
            });
        }
    }

    async getMovementById(req, res) {
        try {
            const { id } = req.params;
            const movementRepository = AppDataSource.getRepository(StockMovement);

            const movement = await movementRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["product"]
            });

            if (!movement) {
                return res.status(404).json({ message: "Movimentação não encontrada" });
            }

            return res.status(200).json({ movement });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar movimentação", error });
        }
    }

    async updateMovement(req, res) {
        try {
            const { id } = req.params;
            const { type, quantity } = req.body;

            const movementRepository = AppDataSource.getRepository(StockMovement);
            const movement = await movementRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["product"]
            });

            if (!movement) {
                return res.status(404).json({ message: "Movimentação não encontrada" });
            }

            movement.type = type || movement.type;
            movement.quantity = quantity !== undefined ? quantity : movement.quantity;

            await movementRepository.save(movement);

            return res.status(200).json({
                message: "Movimentação atualizada com sucesso",
                movement
            });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar movimentação", error });
        }
    }

    async deleteMovement(req, res) {
        try {
            const { id } = req.params;
            const movementRepository = AppDataSource.getRepository(StockMovement);

            const movement = await movementRepository.findOneBy({ id: parseInt(id) });

            if (!movement) {
                return res.status(404).json({ message: "Movimentação não encontrada" });
            }

            await movementRepository.delete(id);

            return res.status(200).json({ message: "Movimentação deletada com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar movimentação", error });
        }
    }
}

export default StockMovementController;

