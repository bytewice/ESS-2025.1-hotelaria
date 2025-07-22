import { defineFeature, loadFeature } from 'jest-cucumber';
import mongoose from 'mongoose';
import credit_card from '../../models/credit_cards.model';

const feature = loadFeature('./tests/features/credit_card.service.feature');

defineFeature(feature, (cartao_credito) => {
  let result: any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  cartao_credito('Listar cartões de crédito cadastrados', ({ given, when, then, and }) => {
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

    when('eu executo a função para listar todos os cartões', async () => {
      result = await credit_card.find({});
    });

    then('devo receber uma lista contendo 3 cartões', () => {
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
    });

    and('os cartões devem conter os dados corretos', () => {
      expect(result).toEqual(
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

  cartao_credito('Buscar cartão pelo nome', ({ given, when, then }) => {
    const mockCard = {
      _id: new mongoose.Types.ObjectId(),
      nome_cartao: 'Cartão Nubank',
      nome: 'João Silva',
      numero_cartao: 1234567812345678,
      validade: '12/26',
      CVV: 123,
    };

    given('existe um cartão com nome "cartão nubank" no sistema', () => {
      jest.spyOn(credit_card, 'findOne').mockImplementation(async (query: any) => {
        if (query.nome_cartao && new RegExp(query.nome_cartao.$regex).test('cartão nubank')) {
          return mockCard;
        }
        return null;
      });
    });

    when('eu executo a função para buscar o cartão pelo nome "cartão nubank"', async () => {
      result = await credit_card.findOne({ nome_cartao: /cartão nubank/i });
    });

    then('devo receber os dados do cartão correspondente', () => {
      expect(result).toEqual(
        expect.objectContaining({
          nome_cartao: mockCard.nome_cartao,
          nome: mockCard.nome,
          numero_cartao: mockCard.numero_cartao,
          validade: mockCard.validade,
          CVV: mockCard.CVV,
        }),
      );
    });
  });
});
