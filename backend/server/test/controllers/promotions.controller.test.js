const { defineFeature, loadFeature } = require('jest-cucumber');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const { Types } = mongoose;

// Mock do modelo Promotion (fora do jest.mock para evitar o erro)
const mockPromotion = {
  findOne: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(null)
  })),
  create: jest.fn().mockImplementation((doc) => Promise.resolve({
    _id: new Types.ObjectId(),
    ...doc
  }))
};

jest.mock('../../models/promotions.model', () => mockPromotion);

const feature = loadFeature('./test/features/promotions.controller.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset para os valores padrão
    mockPromotion.findOne.mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null)
    }));
    mockPromotion.create.mockImplementation((doc) => Promise.resolve({
      _id: new Types.ObjectId(),
      ...doc
    }));
  });

  function parsePromotionData(docString) {
    const data = {};
    docString.split('\n').forEach(line => {
      if (line.includes('Nome:')) data.nome = line.split('"')[1];
      if (line.includes('Data de início:')) data.data_inicio = new Date(line.split('"')[1]).toISOString();
      if (line.includes('Data de fim:')) data.data_fim = new Date(line.split('"')[1]).toISOString();
      if (line.includes('Desconto:')) data.desconto = parseInt(line.split(':')[1].trim());
    });
    return data;
  }

  test('Adicionar promoção com sucesso', ({ given, when, then, and }) => {
    given('não existe uma promoção com nome "Black Friday"', () => {
      mockPromotion.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null)
      });
    });

    when(/^faço uma requisição POST para "(.*)" com os seguintes dados:$/, async (url, docString) => {
      const body = parsePromotionData(docString);
      response = await request.post(url).send(body);
    });

    then('a resposta deve ter status "201"', () => {
      expect(response.status).toBe(201);
    });

    and('o corpo da resposta deve conter os dados da promoção criada', () => {
      expect(response.body).toMatchObject({
        nome: 'Black Friday',
        desconto: 30,
        data_inicio: expect.any(String),
        data_fim: expect.any(String),
        _id: expect.any(String)
      });
    });
  });

  test('Tentar adicionar promoção com nome duplicado', ({ given, when, then, and }) => {
    given('existe uma promoção com nome "Black Friday"', () => {
      mockPromotion.findOne.mockImplementation(({ nome }) => ({
        exec: jest.fn().mockResolvedValue(
          nome === 'Black Friday' ? {
            _id: new Types.ObjectId(),
            nome: 'Black Friday',
            data_inicio: new Date('2023-11-20'),
            data_fim: new Date('2023-11-27'),
            desconto: 30
          } : null
        )
      }));
    });

    when(/^faço uma requisição POST para "(.*)" com os seguintes dados:$/, async (url, docString) => {
      const body = parsePromotionData(docString);
      response = await request.post(url).send(body);
    });

    then('a resposta deve ter status "400"', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo da resposta deve conter a mensagem de erro "Nome da promoção já existe"', () => {
      expect(response.body.error).toMatch(/Nome da promoção já existe/i);
    });
  });
});