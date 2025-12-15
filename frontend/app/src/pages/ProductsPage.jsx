import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // URL CORRIGIDA - baseado no seu backend que mostrou
  const API_URL = 'http://localhost:3000';

  // Buscar produtos da API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // A URL deve ser baseada nas rotas que você mostrou no backend
      const response = await axios.get(`${API_URL}/products`);
      
      console.log('Resposta da API:', response.data);
      
      if (response.data && response.data.products) {
        // Ordenar por ID (ordem de cadastro)
        const sortedProducts = response.data.products.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } else if (response.data && Array.isArray(response.data)) {
        // Se a resposta for direto um array
        const sortedProducts = response.data.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } else {
        throw new Error('Formato de dados inválido da API');
      }
    } catch (err) {
      console.error('Erro detalhado:', err.response || err.message);
      
      // Verificar tipo de erro
      if (err.code === 'ERR_NETWORK') {
        setError('Erro de conexão. Verifique se o servidor backend está rodando na porta 3000.');
      } else if (err.response?.status === 404) {
        setError('Rota não encontrada. Verifique se a URL da API está correta.');
      } else {
        setError('Erro ao carregar produtos: ' + (err.response?.data?.message || err.message));
      }
      
      // Dados de exemplo para desenvolvimento
      const mockProducts = [
        { id: 1, reference: "REF001", description: "Notebook Dell Inspiron", brand: "Dell", quantity: 10, createdAt: "2024-01-15T10:30:00Z" },
        { id: 2, reference: "REF002", description: "Mouse Gamer RGB", brand: "Logitech", quantity: 25, createdAt: "2024-01-16T14:20:00Z" },
        { id: 3, reference: "REF003", description: "Teclado Mecânico", brand: "Razer", quantity: 15, createdAt: "2024-01-17T09:15:00Z" },
        { id: 4, reference: "REF004", description: "Monitor 24''", brand: "Samsung", quantity: 8, createdAt: "2024-01-18T11:45:00Z" },
        { id: 5, reference: "REF005", description: "Headset Bluetooth", brand: "Sony", quantity: 12, createdAt: "2024-01-19T16:30:00Z" },
        { id: 6, reference: "REF006", description: "Notebook Lenovo", brand: "Lenovo", quantity: 7, createdAt: "2024-01-20T08:20:00Z" },
        { id: 7, reference: "REF007", description: "Impressora Multifuncional", brand: "HP", quantity: 5, createdAt: "2024-01-21T13:10:00Z" },
        { id: 8, reference: "REF008", description: "Tablet 10''", brand: "Samsung", quantity: 18, createdAt: "2024-01-22T15:40:00Z" },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Buscar produtos quando o componente carregar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar produtos quando o termo de busca mudar
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const result = products.filter(product => 
      product.brand.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.reference.toLowerCase().includes(term)
    );
    
    setFilteredProducts(result);
  }, [searchTerm, products]);

  // Extrair marcas únicas para estatísticas
  const getUniqueBrands = () => {
    const brands = products.map(product => product.brand);
    return [...new Set(brands)];
  };

  // Limpar busca
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Formatar data
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  // Verificar status do estoque
  const getStockStatus = (quantity) => {
    if (quantity <= 0) return { text: 'Sem estoque', class: 'out' };
    if (quantity <= 5) return { text: 'Baixo estoque', class: 'low' };
    return { text: 'Em estoque', class: 'ok' };
  };

  return (
    <div className="products-page">
      {/* Cabeçalho simples */}
      <div className="header">
        <h1>Lista de Produtos</h1>
        <p>Gerencie todos os produtos do seu estoque</p>
      </div>

      {/* Área de busca e filtros SIMPLIFICADA */}
      <div className="search-area">
        <div className="search-box">
          <div className="search-header">
            <h3>Buscar Produtos</h3>
            <p>Digite para filtrar por marca, descrição ou referência</p>
          </div>
          
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Dell, Samsung, REF001..."
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={clearSearch}
                title="Limpar busca"
              >
                ✕
              </button>
            )}
            <button 
              className="search-btn"
              onClick={() => {}} // A busca já é feita em tempo real
            >
              🔍
            </button>
          </div>

          {searchTerm && (
            <div className="search-info">
              Buscando por: "<strong>{searchTerm}</strong>"
              <button onClick={clearSearch} className="clear-all-btn">
                Limpar busca
              </button>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">{products.length}</div>
            <div className="stat-label">Total de Produtos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{getUniqueBrands().length}</div>
            <div className="stat-label">Marcas Diferentes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{filteredProducts.length}</div>
            <div className="stat-label">
              {searchTerm ? 'Resultados' : 'Mostrando'}
            </div>
          </div>
          <div className="stat-item">
            <button 
              className="refresh-btn"
              onClick={fetchProducts}
              title="Atualizar lista"
            >
              Atualizar ↻
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="main-content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <h3>Erro na conexão com o servidor</h3>
            <p>{error}</p>
            <div className="error-details">
              <p><strong>Detalhes do problema:</strong></p>
              <ul>
                <li>Verifique se o servidor backend está rodando</li>
                <li>URL da API: {API_URL}/products</li>
                <li>Certifique-se de que o CORS está habilitado no backend</li>
              </ul>
            </div>
            <div className="error-actions">
              <button onClick={fetchProducts} className="retry-btn">
                Tentar Novamente
              </button>
              <button 
                onClick={() => setError(null)} 
                className="use-mock-btn"
              >
                Usar dados de exemplo
              </button>
            </div>
            <p className="note">
              <small>Enquanto isso, usando dados de exemplo para demonstração</small>
            </p>
          </div>
        ) : (
          <>
            {/* Tabela de produtos */}
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Referência</th>
                    <th>Descrição</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Status</th>
                    <th>Data de Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr className="no-results-row">
                      <td colSpan="8">
                        <div className="no-results">
                          <div className="no-results-icon">📭</div>
                          <h3>Nenhum produto encontrado</h3>
                          <p>
                            {searchTerm 
                              ? `Nenhum produto encontrado para "${searchTerm}"`
                              : 'Não há produtos cadastrados no sistema.'}
                          </p>
                          {searchTerm && (
                            <button onClick={clearSearch} className="show-all-btn">
                              Mostrar todos os produtos
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => {
                      const stockStatus = getStockStatus(product.quantity);
                      return (
                        <tr key={product.id} className="product-row">
                          <td className="id-cell">
                            <span className="id-badge">#{product.id}</span>
                          </td>
                          <td>
                            <strong className="reference">{product.reference}</strong>
                          </td>
                          <td className="description-cell">
                            {product.description}
                          </td>
                          <td>
                            <span className="brand-label">
                              {product.brand}
                            </span>
                          </td>
                          <td>
                            <div className="quantity">
                              <span className={`quantity-value ${product.quantity <= 5 ? 'low' : ''}`}>
                                {product.quantity}
                              </span>
                              <span className="quantity-unit">unidades</span>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${stockStatus.class}`}>
                              {stockStatus.text}
                            </span>
                          </td>
                          <td>
                            {formatDate(product.createdAt)}
                          </td>
                          <td className="actions">
                            <button className="action-btn view" title="Visualizar">
                              👁️
                            </button>
                            <button className="action-btn edit" title="Editar">
                              ✏️
                            </button>
                            <button className="action-btn delete" title="Excluir">
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Resumo */}
            <div className="summary">
              <div className="summary-info">
                Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> produtos
                {searchTerm && (
                  <span className="filter-active">
                    • Filtro ativo: "<strong>{searchTerm}</strong>"
                  </span>
                )}
              </div>
              <div className="summary-actions">
                <button className="export-btn">
                  📥 Exportar Lista
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Rodapé */}
      <div className="footer">
        <p>
          Sistema de Gerenciamento de Produtos • 
          Total de produtos: <strong>{products.length}</strong> • 
          Última atualização: {new Date().toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;