import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';
import  app  from '../index.js';
import Attraction from '../models/attraction.model.js'; // mongoose model
import mongoose from 'mongoose';
 
beforeAll(async () => {
    
    const mongoUriTest = process.env.MONGO_DB_URI_TEST; 

    if (!mongoUriTest) {
        throw new Error('Variável de ambiente MONGO_DB_URI_TEST não definida.');
    }

    try {
        await mongoose.connect(mongoUriTest);
        console.log('Conectado ao MongoDB de TESTE com sucesso!');
        await Attraction.deleteMany({}); // Limpa a coleção de atrações
    } catch (error) {
        console.error('Falha ao conectar ao MongoDB de TESTE:', error);
        throw error;
    }
}, 30000);



const feature = loadFeature('../../features/attraction.feature');

defineFeature(feature, test => {
  let response;
  let nomeAtracao;
  let nomeAtracao1;
  let nomeAtracao2;
  let nomeAtracao3;
  test('Avaliação válida de atração', ({ given, when, then, and }) => {   
      given(/^a atração "(.*)" existe no sistema$/, async (nome) => {
          nomeAtracao = nome;
          const res = await request(app)
          .post('/attraction/create')  
          .send({
               nome: nomeAtracao,
               descricao: 'xxxxxxxx' 
      })});

    
      when('é enviada uma avaliação com os seguintes dados:', async table => {
  
         const dados = table[0];
         const dataAtual = new Date().toISOString().split('T')[0];

         response = await request(app)
         .post(`/attraction/${nomeAtracao}/review`) 
         .send({
            userName: dados['nome'], 
            comentario: dados['comentario'],
            nota: parseInt(dados['nota']),
            data: dataAtual
          });
      });

      then('o sistema retorna status "201 Created"', () => {
        expect(response.status).toBe(201);
      });

      and('a avaliação é registrada', async () => {
        const res = await request(app)
        .get(`/attraction/${nomeAtracao}/review`)
        .expect(200);

        const reviews = res.body;
        expect(reviews.length).toBeGreaterThan(0);

        const nomes = reviews.map(r => r.nome || r.userName); // depende do seu schema
        expect(nomes).toContain('Ana');
      });
  });
  
  test('Falha ao enviar avaliação sem nota', ({ given, when, then, and }) => {   
      given(/^a atração "(.*)" existe no sistema$/, async (nome) => {
          nomeAtracao = nome;
          const res = await request(app)
          .post('/attraction/create')  
          .send({
               nome: nomeAtracao,
               descricao: 'xxxxxxxx' 
      })});

    
      when('é enviada uma avaliação com os seguintes dados:', async table => {
  
         const dados = table[0];
         const dataAtual = new Date().toISOString().split('T')[0];

         response = await request(app)
         .post(`/attraction/${nomeAtracao}/review`) 
         .send({
            userName: dados['nome'], 
            comentario: dados['comentario'],           
            data: dataAtual
        });
      });

      then('o sistema retorna status "400 Bad Request"', () => {
        expect(response.status).toBe(400);
      });

  }); // fim teste Falha ao enviar avaliação sem nota

  test('Listar todas atrações', ({ given, when, then }) => {
  
    given(/^que so existem as atrações "(.*)" "(.*)" "(.*)" no sistema:$/, async (nome1, nome2, nome3) => {
      nomeAtracao1 = nome1;
      nomeAtracao2 = nome2;
      nomeAtracao3 = nome3;

      await request(app).delete('/attraction/delete');
      
      await request(app).post('/attraction/create').send({
        nome: nomeAtracao1,
        descricao: "Serviço de relaxamento com massagens e banhos termais."
      });

      await request(app).post('/attraction/create').send({
        nome: nomeAtracao2,
        descricao: "Área com piscina olímpica e infantil."
      });

      await request(app).post('/attraction/create').send({
        nome: nomeAtracao3,
        descricao: "Espaço com equipamentos modernos para treino físico."
      });
      
    });

    when('é questionado as atrações existentes', async () => {
      response = await request(app).get('/attraction');
    });
    
    then(/^o sistema retorna as atrações "(.*)" "(.*)" "(.*)"$/, async (nome1, nome2, nome3) => {
      expect(response.statusCode).toBe(200);
      const nomesDasAtracoes = response.body.map(atracao => atracao.nome);
      expect(nomesDasAtracoes).toEqual(expect.arrayContaining([nome1, nome2, nome3]));
      expect(nomesDasAtracoes.length).toBe(3); // garante que só existem essas
    });
  });
;//fim teste Listar todas atraçoes

});
