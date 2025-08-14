import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import { app } from '../../index';
import mongoose from 'mongoose';
import credit_card from '../../models/credit_cards.model';

const feature = loadFeature('./tests/features/credit_card.controller.feature');
const request = supertest(app);

defineFeature(feature, (cartao_credito) => {
  let response: supertest.Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  cartao_credito('Listagem bem-sucedida de cartões', ({ given, when, then, and }) => {
    const mockCards = [
      {
        _id: new mongoose.Types.ObjectId(),
        nome_cartao: 'Cartão Nubank',
        nome: 'João Silva',
        numero_cartao: 1234567812345678,
        validade: '12/26',
        CVV: 123,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nome_cartao: 'Cartão Itaú',
        nome: 'Maria Souza',
        numero_cartao: 8765432187654321,
        validade: '11/25',
        CVV: 456,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nome_cartao: 'Cartão Santander',
        nome: 'Carlos Lima',
        numero_cartao: 1111222233334444,
        validade: '10/24',
        CVV: 789,
      },
    ];
 
    given('existem 3 cartões de crédito cadastrados no sistema', () => {
      jest.spyOn(credit_card, 'find').mockResolvedValue(mockCards as any);
    });

    when('faço uma requisição GET para "/credit_cards"', async () => {
      response = await request.get('/credit_cards');
    });

    then('a resposta deve ter status "200"', () => {
      expect(response.status).toBe(200);
    });

    and('o corpo da resposta deve ser uma lista com 3 cartões', () => {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);
      expect(response.body).toEqual(
        expect.arrayContaining(
          mockCards.map((card) =>
            expect.objectContaining({
              nome_cartao: card.nome_cartao,
              nome: card.nome,
              numero_cartao: card.numero_cartao,
              validade: card.validade,
              CVV: card.CVV,
            }),
          ),
        ),
      );
    });
  });

  cartao_credito('Busca bem-sucedida por nome do cartão', ({ given, when, then, and }) => {
    const mockCard = {
      _id: new mongoose.Types.ObjectId(),
      nome_cartao: 'Cartão Nubank',
      nome: 'João Silva',
      numero_cartao: 1234567812345678,
      validade: '12/26',
      CVV: 123,
    };

    given('existe um cartão com nome "cartão nubank" no sistema', () => {
      jest.spyOn(credit_card, 'findOne').mockImplementation((query: any) => {
        // Verifica se a query contém o nome do cartão (case insensitive)
        if (query.nome_cartao && new RegExp(query.nome_cartao.$regex).test('cartão nubank')) {
          return Promise.resolve(mockCard);
        }
        return Promise.resolve(null);
      });
    });

    when('faço uma requisição GET para "/credit_cards/cartão nubank"', async () => {
      response = await request.get('/credit_cards/cartão%20nubank');
    });

    then('a resposta deve ter status "200"', () => {
      expect(response.status).toBe(200);
    });

    and('o corpo da resposta deve conter os dados do cartão', () => {
      expect(response.body).toEqual(
        expect.objectContaining({
          nome_cartao: mockCard.nome_cartao,
          nome: mockCard.nome,
          numero_cartao: mockCard.numero_cartao,
          validade: mockCard.validade,
          CVV: mockCard.CVV,
        })
      );
    });
  });
});