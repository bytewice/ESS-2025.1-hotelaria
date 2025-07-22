import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../index.js'; // Importe seu app Express
import Room from '../../../models/room.models.js';
import Reservation from '../../../models/reservation.model.js';

// Carrega o arquivo Gherkin
const feature = loadFeature('./tests/bdd/features/conteudo.feature');

defineFeature(feature, test => {
  // Variaveis para compartilhar estado entre os steps de um mesmo cenário
  let response;
  let roomsData;

  // Limpa o banco de dados antes de cada cenário
  beforeEach(async () => {
    await Room.deleteMany({});
    await Reservation.deleteMany({});
  });

  // Fecha a conexão com o BD após todos os testes
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // --- Implementação do Cenário: "Buscar quarto barato com filtro de preço abaixo de 200" ---
  test('Buscar quarto barato com filtro de preço abaixo de 200', ({ given, when, and, then }) => {
    given('existem os seguintes quartos cadastrados no sistema:', async (table) => {
      // 'table' é o array de objetos da tabela do Gherkin
      // Adiciona os quartos ao banco de dados de teste
      roomsData = table;
      await Room.insertMany(table);
    });

    when(/^eu busco quartos disponíveis entre "(.*)" e "(.*)"$/, async (checkIn, checkOut) => {
      // A busca será feita no próximo passo 'and'
    });

    and(/^filtro por "valor abaixo de" "(.*)"$/, async (maxPrice) => {
      // Faz a chamada à API usando supertest
      response = await request(app)
        .get('/api/quartos')
        .query({ maxPrice }); // O controller já lida com o filtro de preço
    });

    then('eu devo ver os quartos:', (table) => {
      expect(response.status).toBe(200);
      // Verifica se a resposta contém os dados esperados
      expect(response.body).toHaveLength(table.length);
      expect(response.body[0]).toMatchObject({
        type: table[0].tipo,
        roomNumber: parseInt(table[0].número),
        price: parseInt(table[0].preço),
      });
    });
  });

  // --- Implementação do Cenário: "Nenhum quarto disponível no período" ---
  test('Nenhum quarto disponível no período', ({ given, and, when, then }) => {
    let room;

    given('existem os seguintes quartos cadastrados no sistema:', async (table) => {
      room = await Room.create(table[0]);
    });

    and(/^o quarto "(.*)" tem uma reserva de "(.*)" a "(.*)"$/, async (roomNumber, checkIn, checkOut) => {
      // Cria a reserva que vai causar o conflito
      await Reservation.create({
        Quarto: room._id,
        Hospede: new mongoose.Types.ObjectId(), // Um ID de usuário qualquer
        CheckIN: new Date(checkIn.split('/').reverse().join('-')), // Formato aaaa-mm-dd
        CheckOUT: new Date(checkOut.split('/').reverse().join('-')),
        Preco: 300,
        Pagamento: 1
      });
    });

    when(/^eu busco quartos disponíveis entre "(.*)" e "(.*)"$/, async (checkIn, checkOut) => {
      response = await request(app)
        .get('/api/quartos')
        .query({ 
            checkIn: new Date(checkIn.split('/').reverse().join('-')).toISOString(), 
            checkOut: new Date(checkOut.split('/').reverse().join('-')).toISOString()
        });
    });

    then(/^eu devo ver a mensagem "(.*)"$/, (message) => {
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(message);
    });
  });

  // ... Implemente os outros cenários aqui (Curtir, Salvar, Avaliar, etc.) ...
});