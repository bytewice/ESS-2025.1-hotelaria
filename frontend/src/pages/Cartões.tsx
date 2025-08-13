import React, { useState } from 'react';
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

interface CartoesProps {
  cartoes: Cartao[];
  onAdicionarCartao?: () => void;
  onEditarCartao?: (id: string) => void;
  onExcluirCartao?: (id: string) => void;
  mostrarDetalhesSensiveis?: boolean;
}

const Cartoes: React.FC<CartoesProps> = ({ 
  cartoes = [],
  onAdicionarCartao,
  onEditarCartao,
  onExcluirCartao,
  mostrarDetalhesSensiveis = false
}) => {
  const [cartaoSelecionado, setCartaoSelecionado] = useState<string | null>(null);

  const formatarNumeroCartao = (numero: number) => {
    const str = numero.toString().padStart(16, '0');
    return `•••• •••• •••• ${str.slice(-4)}`;
  };

  const formatarValidade = (validade: string) => {
    return `${validade.slice(0, 2)}/${validade.slice(2)}`;
  };

  const getBandeira = (numero: number) => {
    const primeiroDigito = numero.toString()[0];
    switch(primeiroDigito) {
      case '4': return 'Visa';
      case '5': return 'Mastercard';
      case '3': return 'American Express';
      default: return 'Outra Bandeira';
    }
  };

  const handleExcluir = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este cartão?')) {
      onExcluirCartao?.(id);
    }
  };

  return (
    <div className="cartoes-container">
      <div className="cartoes-header">
        <h2>Meus Cartões</h2>
        <button 
          className="botao-adicionar"
          onClick={onAdicionarCartao}
        >
          + Adicionar Cartão
        </button>
      </div>

      {cartoes.length === 0 ? (
        <div className="nenhum-cartao">
          <p>Nenhum cartão cadastrado</p>
        </div>
      ) : (
        <div className="cartoes-lista">
          {cartoes.map((cartao) => (
            <div
              key={cartao._id}
              className={`cartao ${cartaoSelecionado === cartao._id ? 'selecionado' : ''}`}
              onClick={() => setCartaoSelecionado(cartao._id)}
            >
              <div className="cartao-bandeira">
                {getBandeira(cartao.numero_cartao)}
              </div>
              
              <div className="cartao-numero">
                {mostrarDetalhesSensiveis
                  ? cartao.numero_cartao.toString().replace(/(\d{4})/g, '$1 ')
                  : formatarNumeroCartao(cartao.numero_cartao)
                }
              </div>
              
              <div className="cartao-info">
                <div>
                  <span className="cartao-label">Titular</span>
                  <span className="cartao-value">{cartao.nome}</span>
                </div>
                
                <div>
                  <span className="cartao-label">Validade</span>
                  <span className="cartao-value">{formatarValidade(cartao.validade)}</span>
                </div>
              </div>
              
              <div className="cartao-acoes">
                <button
                  className="botao-editar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditarCartao?.(cartao._id);
                  }}
                >
                  Editar
                </button>
                
                <button
                  className="botao-excluir"
                  onClick={(e) => handleExcluir(cartao._id, e)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cartoes;