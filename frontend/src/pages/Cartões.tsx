import React, { useState, useEffect } from 'react';
import { buscarCartoes, adicionarCartao, editarCartao, deletarCartao, Cartao } from '../services/cartõesAPI';
import '../styles/cartoes.css';

// Componente para o formulário de adicionar/editar
const FormularioCartao: React.FC<{ onSave: (cartao: Omit<Cartao, '_id'>) => void; cartaoEditando?: Cartao; onCancel: () => void }> = ({ onSave, cartaoEditando, onCancel }) => {
  const [nome_cartao, setNomeCartao] = useState(cartaoEditando?.nome_cartao || '');
  const [nome, setNome] = useState(cartaoEditando?.nome || '');
  const [numero_cartao, setNumeroCartao] = useState(cartaoEditando?.numero_cartao || '');
  const [validade, setValidade] = useState(cartaoEditando?.validade || '');
  const [CVV, setCVV] = useState(cartaoEditando?.CVV || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nome_cartao, nome, numero_cartao: Number(numero_cartao), validade, CVV: Number(CVV) });
  };

  return (
    <form className="formulario-cartao" onSubmit={handleSubmit}>
      <h2>{cartaoEditando ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</h2>
      <input type="text" placeholder="Nome do Cartão (ex: Cartão Nubank)" value={nome_cartao} onChange={(e) => setNomeCartao(e.target.value)} required />
      <input type="text" placeholder="Seu Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input type="number" placeholder="Número do Cartão" value={numero_cartao || ''} onChange={(e) => setNumeroCartao(Number(e.target.value))} required />
      <input type="text" placeholder="Validade (MM/YY)" value={validade} onChange={(e) => setValidade(e.target.value)} required />
      <input type="number" placeholder="CVV" value={CVV || ''} onChange={(e) => setCVV(Number(e.target.value))} required />
      <div className="formulario-botoes">
        <button type="submit">{cartaoEditando ? 'Salvar Edição' : 'Adicionar Cartão'}</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </form>
  );
};

const Cartoes: React.FC = () => {
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartaoEditando, setCartaoEditando] = useState<Cartao | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const fetchCartoes = async () => {
    try {
      setLoading(true);
      const dados = await buscarCartoes();
      setCartoes(dados);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartoes();
  }, []);

  const handleSalvarCartao = async (dados: Omit<Cartao, '_id'>) => {
    try {
      if (cartaoEditando) {
        await editarCartao(cartaoEditando.nome_cartao, dados);
      } else {
        await adicionarCartao(dados);
      }
      setShowForm(false);
      setCartaoEditando(undefined);
      await fetchCartoes(); // Recarrega a lista após salvar
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeletarCartao = async (nomeCartao: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o cartão "${nomeCartao}"?`)) {
      try {
        await deletarCartao(nomeCartao);
        await fetchCartoes(); // Recarrega a lista após deletar
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return <div className="status-message">Carregando seus cartões...</div>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <div className="cartoes-container">
      <h1 className="cartoes-titulo">Meus Cartões</h1>
      
      {!showForm && (
        <button className="add-button" onClick={() => setShowForm(true)}>Adicionar Novo Cartão</button>
      )}

      {showForm && (
        <FormularioCartao 
          onSave={handleSalvarCartao} 
          cartaoEditando={cartaoEditando} 
          onCancel={() => { setShowForm(false); setCartaoEditando(undefined); }}
        />
      )}

      {cartoes.length === 0 && !showForm ? (
        <p className="status-message no-cartoes">Você ainda não tem cartões cadastrados.</p>
      ) : (
        <div className="lista-cartoes">
          {cartoes.map((cartao) => (
            <div key={cartao._id} className="cartao-item">
              <div className="cartao-nome_cartao">{cartao.nome_cartao}</div>
              <div className="cartao-nome">Titular: {cartao.nome}</div>
              <div className="cartao-numero">
                **** **** **** {String(cartao.numero_cartao).slice(-4)}
              </div>
              <div className="cartao-validade">Validade: {cartao.validade}</div>
              <div className="cartao-acoes">
                <button 
                  onClick={() => { setCartaoEditando(cartao); setShowForm(true); }}
                  className="edit-button"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDeletarCartao(cartao.nome_cartao)}
                  className="delete-button"
                >
                  Deletar
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