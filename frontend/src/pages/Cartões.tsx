import React, { useState, useEffect } from 'react';
import * as CartoesAPI from '../services/cartõesAPI';
import './../styles/cartões.css';

interface Cartao {
  _id: string;
  nome_cartao: string;
  nome: string;
  numero_cartao: number;
  validade: string;
  CVV: number;
  createdAt?: Date;
}

const Cartoes: React.FC = () => {
  // Estados do componente
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar cartões ao montar o componente
  useEffect(() => {
    const carregarCartoes = async () => {
      try {
        const dados = await CartoesAPI.getCartoes();
        setCartoes(dados);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    carregarCartoes();
  }, []);

  // Adicionar cartão
  const handleAdicionar = async (dadosCartao: Omit<Cartao, '_id' | 'createdAt'>) => {
    const erroValidacao = CartoesAPI.validarCartao(dadosCartao);
    if (erroValidacao) {
      alert(erroValidacao);
      return;
    }

    try {
      const novoCartao = await CartoesAPI.adicionarCartao(dadosCartao);
      setCartoes([...cartoes, novoCartao]);
    } catch (error) {
      alert(error.message);
    }
  };

  // Editar cartão
  const handleEditar = async (nomeOriginal: string, dadosAtualizados: Partial<Cartao>) => {
    try {
      const cartaoAtualizado = await CartoesAPI.atualizarCartao(nomeOriginal, dadosAtualizados);
      setCartoes(cartoes.map(c => 
        c.nome_cartao === nomeOriginal ? cartaoAtualizado : c
      ));
    } catch (error) {
      alert(error.message);
    }
  };

  // Excluir cartão
  const handleExcluir = async (nomeCartao: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cartão?')) {
      try {
        await CartoesAPI.removerCartao(nomeCartao);
        setCartoes(cartoes.filter(c => c.nome_cartao !== nomeCartao));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Renderização do componente
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="cartoes-container">
      {/* Sua implementação de renderização aqui */}
      {/* Exemplo de uso dos handlers: */}
      <button onClick={() => handleAdicionar({
        nome_cartao: 'Novo Cartão',
        nome: 'Titular',
        numero_cartao: 1234123412341234,
        validade: '1225',
        CVV: 123
      })}>
        Testar Adição
      </button>

      {cartoes.map(cartao => (
        <div key={cartao._id}>
          <span>{cartao.nome_cartao}</span>
          <button onClick={() => handleEditar(cartao.nome_cartao, { nome_cartao: 'Nome Editado' })}>
            Editar
          </button>
          <button onClick={() => handleExcluir(cartao.nome_cartao)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cartoes;