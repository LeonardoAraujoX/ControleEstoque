import AppDataSource from "../config/data-source.js";
import { Product } from "../entities/Product.js";

const ProductController = {
    // Buscar todos os produtos
    getAllProducts: async (req, res) => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const products = await productRepository.find();

            res.status(200).json({ 
                message: "Produtos encontrados", 
                products 
            });

        } catch (error) {
            res.status(500).json({ 
                message: "Erro ao buscar produtos", 
                error 
            });
        }
    },

    // Criar produto
    createProduct: async (req, res) => {
        try {
            const { reference, description, brand, quantity } = req.body;

            const productRepository = AppDataSource.getRepository(Product);

            const exists = await productRepository.findOne({
                where: { reference },
            });

            if (exists) {
                return res.status(400).json({
                    message: "Já existe um produto com essa referência.",
                });
            }

            const product = new Product();
            product.reference = reference;
            product.description = description;
            product.brand = brand;
            product.quantity = quantity ?? 0;

            await productRepository.save(product);

            return res.status(201).json({
                message: "Produto criado com sucesso!",
                product,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar produto",
                error: error.message,
            });
        }
    },

    // Buscar produto por ID
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const productRepository = AppDataSource.getRepository(Product);

            const product = await productRepository.findOneBy({ 
                id: parseInt(id) 
            });

            if (!product) {
                return res.status(404).json({ 
                    message: "Produto não encontrado" 
                });
            }

            return res.status(200).json({ product });

        } catch (error) {
            return res.status(500).json({ 
                message: "Erro ao buscar produto", 
                error 
            });
        }
    },

    // Atualizar produto
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { reference, description, brand, quantity } = req.body;

            const productRepository = AppDataSource.getRepository(Product);

            const product = await productRepository.findOneBy({
                id: parseInt(id)
            });

            if (!product) {
                return res.status(404).json({ 
                    message: "Produto não encontrado" 
                });
            }

            product.reference = reference ?? product.reference;
            product.description = description ?? product.description;
            product.brand = brand ?? product.brand;
            product.quantity = quantity ?? product.quantity;

            await productRepository.save(product);

            return res.status(200).json({
                message: "Produto atualizado com sucesso",
                product,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar produto",
                error 
            });
        }
    },

    // Deletar produto
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            const productRepository = AppDataSource.getRepository(Product);

            const product = await productRepository.findOneBy({
                id: parseInt(id)
            });

            if (!product) {
                return res.status(404).json({
                    message: "Produto não encontrado",
                });
            }

            await productRepository.delete(product);

            return res.status(200).json({
                message: "Produto deletado com sucesso",
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao deletar produto",
                error,
            });
        }
    }
};

export default ProductController;

