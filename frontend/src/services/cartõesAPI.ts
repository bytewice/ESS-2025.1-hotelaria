// src/services/cartõesAPI.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/cartoes'; // Ajuste para sua URL

interface Cartao {
  _id: string;
  nome_cartao: string;
  nome: string;
  numero_cartao: number;
  validade: string;
  CVV: number;
  createdAt?: Date;
}

/**
 * Busca todos os cartões cadastrados
 */
export const getCartoes = async (): Promise<Cartao[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    throw new Error('Não foi possível carregar os cartões');
  }
};

/**
 * Busca um cartão específico pelo nome
 */
export const getCartaoPorNome = async (nomeCartao: string): Promise<Cartao> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${nomeCartao}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartão:', error);
    throw new Error('Cartão não encontrado');
  }
};

/**
 * Adiciona um novo cartão
 */
export const adicionarCartao = async (cartaoData: Omit<Cartao, '_id' | 'createdAt'>): Promise<Cartao> => {
  try {
    // Validação básica da data (MM/AA)
    if (!/^(0[1-9]|1[0-2])\d{2}$/.test(cartaoData.validade)) {
      throw new Error('Formato de validade inválido. Use MMAA (ex: "1225")');
    }

    const response = await axios.post(API_BASE_URL, cartaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar cartão:', error);
    throw error.response?.data?.error || new Error('Erro ao adicionar cartão');
  }
};

/**
 * Atualiza um cartão existente
 */
export const atualizarCartao = async (
  nomeOriginal: string,
  cartaoData: Partial<Omit<Cartao, '_id' | 'createdAt'>>
): Promise<Cartao> => {
  try {
    // Validação da data se estiver sendo atualizada
    if (cartaoData.validade && !/^(0[1-9]|1[0-2])\d{2}$/.test(cartaoData.validade)) {
      throw new Error('Formato de validade inválido. Use MMAA (ex: "1225")');
    }

    const response = await axios.put(`${API_BASE_URL}/${nomeOriginal}`, cartaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cartão:', error);
    throw error.response?.data?.error || new Error('Erro ao atualizar cartão');
  }
};

/**
 * Remove um cartão
 */
export const removerCartao = async (nomeCartao: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${nomeCartao}`);
  } catch (error) {
    console.error('Erro ao remover cartão:', error);
    throw error.response?.data?.error || new Error('Erro ao remover cartão');
  }
};

/**
 * Valida os dados do cartão antes de enviar para o servidor
 */
export const validarCartao = (cartaoData: Partial<Cartao>): string | null => {
  if (cartaoData.nome_cartao && cartaoData.nome_cartao.length < 3) {
    return 'Nome do cartão muito curto';
  }
  if (cartaoData.numero_cartao && cartaoData.numero_cartao.toString().length !== 16) {
    return 'Número do cartão inválido (deve ter 16 dígitos)';
  }
  if (cartaoData.validade && !/^(0[1-9]|1[0-2])\d{2}$/.test(cartaoData.validade)) {
    return 'Validade inválida (use MMAA)';
  }
  if (cartaoData.CVV && (cartaoData.CVV < 100 || cartaoData.CVV > 999)) {
    return 'CVV inválido (deve ter 3 dígitos)';
  }
  return null;
};

export default {
  getCartoes,
  getCartaoPorNome,
  adicionarCartao,
  atualizarCartao,
  removerCartao,
  validarCartao
};