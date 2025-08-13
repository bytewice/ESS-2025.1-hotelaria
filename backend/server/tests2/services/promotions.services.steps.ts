import { defineFeature, loadFeature } from 'jest-cucumber';
import mongoose from 'mongoose';
import Promotion from '../../models/promotions.model';

const feature = loadFeature('./tests/features/promotions.service.feature');

defineFeature(feature, (promotion) => {
  let result: any;

  beforeEach(() => {
    jest.clearAllMocks();
    result = undefined;
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
      data_inicio: dataInicioMatch ? new Date(dataInicioMatch[1]) : null,
      data_fim: dataFimMatch ? new Date(dataFimMatch[1]) : null,
      desconto: descontoMatch ? Number(descontoMatch[1]) : 0,
    };
  }

  // Função simulando a lógica do serviço de adicionar promoção
  async function addPromotion(data: any) {
    const existing = await Promotion.findOne({ nome: data.nome }).exec();
    if (existing) {
      throw new Error('Nome da promoção já existe');
    }
    const created = await Promotion.create(data);
    return created;
  }

  promotion('Adicionar promoção com sucesso', ({ given, when, then }) => {
    given('não existe uma promoção com nome "Black Friday"', () => {
      jest.spyOn(Promotion, 'findOne').mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }) as any);

      jest.spyOn(Promotion, 'create').mockImplementation((promo: any) =>
        Promise.resolve({
          ...promo,
          _id: new mongoose.Types.ObjectId(),
        })
      );
      
    });

    when('adiciono uma promoção com os seguintes dados:', async (stepText) => {
      const data = parsePromotionData(stepText);
      try {
        result = await addPromotion(data);
      } catch (err) {
        result = err;
      }
    });

    then('os dados da promoção criada são retornados', () => {
      expect(result).toMatchObject({
        nome: 'Black Friday',
        desconto: 30,
        data_inicio: expect.any(Date),
        data_fim: expect.any(Date),
        _id: expect.anything(),
      });
    });
  });

  promotion('Tentar adicionar promoção com nome duplicado', ({ given, when, then }) => {
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
        return {
          exec: jest.fn().mockResolvedValue(null),
        } as any;
      });
    });

    when('adiciono uma promoção com os seguintes dados:', async (stepText) => {
      const data = parsePromotionData(stepText);
      try {
        result = await addPromotion(data);
      } catch (err: any) {
        result = err.message;
      }
    });

    then('recebo como resposta "Nome da promoção já existe"', () => {
      expect(result).toBe('Nome da promoção já existe');
    });
  });
});
