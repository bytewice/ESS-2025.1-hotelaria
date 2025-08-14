import axios from 'axios';

// Interface que define a estrutura de um cartão, baseada no seu modelo do backend.
export interface Cartao {
  _id?: string; // O ID é gerado pelo MongoDB, então é opcional na criação
  nome_cartao: string;
  nome: string;
  numero_cartao: number;
  validade: string;
  CVV: number;
}

// URL base da sua API.
const API_URL = 'http://localhost:2000/credit_cards'; // Exemplo de URL local

// Função para buscar todos os cartões
export const buscarCartoes = async (): Promise<Cartao[]> => {
  try {
    const response = await axios.get<Cartao[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    throw new Error('Não foi possível carregar os cartões.');
  }
};

// Função para adicionar um novo cartão
export const adicionarCartao = async (novoCartao: Omit<Cartao, '_id'>): Promise<Cartao> => {
  try {
    const response = await axios.post<Cartao>(API_URL, novoCartao);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao adicionar cartão:', error.response.data.error);
    throw new Error(error.response.data.error || 'Não foi possível adicionar o cartão.');
  }
};

// Função para editar um cartão existente
export const editarCartao = async (nomeAntigo: string, dadosAtualizados: Partial<Cartao>): Promise<Cartao> => {
  try {
    const response = await axios.put<Cartao>(`${API_URL}/${nomeAntigo}`, dadosAtualizados);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao editar cartão:', error.response.data.error);
    throw new Error(error.response.data.error || 'Não foi possível editar o cartão.');
  }
};

// Função para deletar um cartão
export const deletarCartao = async (nomeCartao: string): Promise<Cartao> => {
  try {
    const response = await axios.delete<Cartao>(`${API_URL}/${nomeCartao}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar cartão:', error.response.data.error);
    throw new Error(error.response.data.error || 'Não foi possível deletar o cartão.');
  }
};