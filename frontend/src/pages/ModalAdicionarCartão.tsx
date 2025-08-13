import React, { useState } from 'react';
import '../styles/modal.css';
import '../styles/cartões.css';

interface ModalProps {
  onClose: () => void;
  onAdicionar: (cartao: {
    nome_cartao: string;
    nome: string;
    numero_cartao: number;
    validade: string;
    CVV: number;
  }) => void;
}

const ModalAdicionarCartao: React.FC<ModalProps> = ({ onClose, onAdicionar }) => {
  const [formData, setFormData] = useState({
    nome_cartao: '',
    nome: '',
    numero_cartao: '',
    validade: '',
    CVV: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdicionar({
      ...formData,
      numero_cartao: Number(formData.numero_cartao),
      CVV: Number(formData.CVV)
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-cartao">
        <div className="modal-header">
          <h3 className="modal-title">Adicionar Novo Cartão</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Cartão</label>
            <input
              type="text"
              name="nome_cartao"
              value={formData.nome_cartao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Titular</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Número do Cartão</label>
            <input
              type="text"
              name="numero_cartao"
              value={formData.numero_cartao}
              onChange={handleChange}
              pattern="\d{16}"
              title="16 dígitos"
              required
            />
          </div>

          <div className="form-group">
            <label>Validade (MMAA)</label>
            <input
              type="text"
              name="validade"
              value={formData.validade}
              onChange={handleChange}
              pattern="(0[1-9]|1[0-2])\d{2}"
              title="MMAA (ex: 1225)"
              required
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="CVV"
              value={formData.CVV}
              onChange={handleChange}
              pattern="\d{3}"
              title="3 dígitos"
              required
            />
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-cancelar" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-salvar"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdicionarCartao;