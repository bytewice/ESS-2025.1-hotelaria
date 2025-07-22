import { jest } from '@jest/globals';
import { likeRoom } from '../../controllers/conteudo.controllers.js';
import Room from '../../models/room.model.js';

// Simula o módulo Room para não tocar no banco de dados
jest.mock('../../models/room.model.js');

// Mock explícito do método estático
Room.findById = jest.fn();

describe('Conteudo Controller - Unit Tests', () => {

  test('likeRoom deve incrementar as curtidas e retornar o novo valor', async () => {
    // 1. Setup (Arrange)
    const mockRoom = {
      _id: 'some_room_id',
      likes: 10,
      save: jest.fn().mockResolvedValue(true), // Simula a função save
    };

    // Configura o mock de Room.findById para retornar nosso quarto falso
    Room.findById.mockResolvedValue(mockRoom);

    const req = {
      params: { id: 'some_room_id' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // 2. Ação (Act)
    await likeRoom(req, res);

    // 3. Verificação (Assert)
    expect(Room.findById).toHaveBeenCalledWith('some_room_id'); // Verifica se a busca foi chamada
    expect(mockRoom.likes).toBe(11); // Verifica se a curtida foi incrementada
    expect(mockRoom.save).toHaveBeenCalled(); // Verifica se o save foi chamado
    expect(res.status).toHaveBeenCalledWith(200); // Verifica o status da resposta
    expect(res.json).toHaveBeenCalledWith({ likes: 11 }); // Verifica o corpo da resposta
  });
  
  test('likeRoom deve retornar 404 se o quarto não existir', async () => {
    Room.findById.mockResolvedValue(null);

    const req = { params: { id: 'room_inexistente' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await likeRoom(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Quarto não encontrado' });
  });

  test('likeRoom deve retornar 500 em caso de erro inesperado', async () => {
    Room.findById.mockRejectedValue(new Error('Erro inesperado'));

    const req = { params: { id: 'room_error' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await likeRoom(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro inesperado' });
  });
});