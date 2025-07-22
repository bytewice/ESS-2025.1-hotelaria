import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index.js'; // Seu app Express
import Room from '../../models/room.model.js';

describe('Testes de Integração das Rotas de Quartos', () => {

  beforeAll(async () => {
    // Conexão com o banco de dados em memória
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  });

  afterEach(async () => {
    // Limpa a coleção de quartos após cada teste
    await Room.deleteMany({});
  });

  afterAll(async () => {
    // Fecha a conexão
    await mongoose.connection.close();
  });

  it('POST /api/quartos/:id/like - deve curtir um quarto e retornar o novo total de curtidas', async () => {
    // 1. Setup: Cria um quarto no banco de dados de teste
    const room = await Room.create({ type: 'Suíte Casal', roomNumber: 101, price: 300, likes: 5 });

    // 2. Ação: Faz a requisição para a rota de like
    const response = await request(app).post(`/api/quartos/${room._id}/like`);

    // 3. Verificação
    expect(response.status).toBe(200);
    expect(response.body.likes).toBe(6);

    // 4. Verificação extra (opcional): Confere diretamente no banco de dados
    const updatedRoom = await Room.findById(room._id);
    expect(updatedRoom.likes).toBe(6);
  });
  
  it('GET /api/quartos - deve filtrar quartos por preço máximo', async () => {
    await Room.create([
      { type: 'Suíte Casal', roomNumber: 101, price: 300, likes: 150 },
      { type: 'Quarto 1 pessoa', roomNumber: 201, price: 200, likes: 250 },
      { type: 'Quarto 4 pessoas', roomNumber: 301, price: 180, likes: 50 }
    ]);

    const response = await request(app)
      .get('/api/quartos')
      .query({ maxPrice: 200 });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body.some(q => q.roomNumber === 201)).toBe(true);
    expect(response.body.some(q => q.roomNumber === 301)).toBe(true);
  });

  it('GET /api/quartos - deve retornar 404 se nenhum quarto disponível', async () => {
    const response = await request(app)
      .get('/api/quartos')
      .query({ maxPrice: 10 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Nenhum quarto disponível para os filtros selecionados');
  });

  it('POST /api/quartos/:id/like - deve retornar 404 se o quarto não existir', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).post(`/api/quartos/${fakeId}/like`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Quarto não encontrado');
  });
});