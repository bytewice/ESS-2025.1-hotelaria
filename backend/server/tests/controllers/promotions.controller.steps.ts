import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { app } from '../../index';
import mongoose from 'mongoose';
import Promotion from '../../models/promotions.model';

const feature = loadFeature('./tests/features/promotions.controller.feature');
const request = supertest(app);

defineFeature(feature, (promotion) => {
  let response: supertest.Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  function parsePromotionData(stepText: string) {
    const nomeMatch = stepText.match(/Nome:\s*"([^"]+)"/);
    const dataInicioMatch = stepText.match(/Data de início:\s*"([^"]+)"/);
    const dataFimMatch = stepText.match(/Data de fim:\s*"([^"]+)"/);
    const descontoMatch = stepText.match(/Desconto:\s*(\d+)/);

    return {
      nome: nomeMatch?.[1] || '',
      data_inicio: dataInicioMatch ? new Date(dataInicioMatch[1]).toISOString() : '',
      data_fim: dataFimMatch ? new Date(dataFimMatch[1]).toISOString() : '',
      desconto: descontoMatch ? Number(descontoMatch[1]) : 0
    };
  }

  promotion('Adicionar promoção com sucesso', ({ given, when, then, and }) => {
    given('não existe uma promoção com nome "Black Friday"', () => {
      // Mock para findOne retornar null (não existe promoção com esse nome)
      jest.spyOn(Promotion, 'findOne').mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }) as any);
    });

    when(/^faço uma requisição POST para "(.*)" com os seguintes dados:$/, async (url, stepText) => {
      const body = parsePromotionData(stepText);
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
        _id: expect.anything(),
      });
    });
  });

  promotion('Tentar adicionar promoção com nome duplicado', ({ given, when, then, and }) => {
    given('existe uma promoção com nome "Black Friday"', () => {
      jest.spyOn(Promotion, 'findOne').mockImplementation((query: any) => {
        if (query && query.nome === 'Black Friday') {
          return {
            exec: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId(),
              nome: 'Black Friday',
              data_inicio: new Date('2023-11-20'),
              data_fim: new Date('2023-11-27'),
              desconto: 30,
            }),
          } as any;
        }
        // Caso não seja a query esperada, retorna null
        return {
          exec: jest.fn().mockResolvedValue(null),
        } as any;
      });
    });
  
    when(/^faço uma requisição POST para "(.*)" com os seguintes dados:$/, async (url, stepText) => {
      const body = parsePromotionData(stepText);
      response = await request.post(url).send(body);
    });
  
    then('a resposta deve ter status "400"', () => {
      expect(response.status).toBe(400);
    });
  
    and('o corpo da resposta deve conter a mensagem de erro "Nome da promoção já existe"', () => {
      expect(response.body.error).toBe('Nome da promoção já existe');
    });
  });
  
});
