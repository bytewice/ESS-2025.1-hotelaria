// test/delete-admin-steps.js

// import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
// import request from 'supertest';
// import app from '../index.js'; // Ajuste o caminho para a sua instância do Express
// import mongoose from 'mongoose';
// import User from '../models/user.model.js'; // Ajuste o caminho para o seu modelo de usuário
// import bcrypt from 'bcryptjs';

import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import app from '../index.js'; // Ajuste o caminho para a sua instância do Express
import mongoose from 'mongoose';
import User from '../models/user.model.js'; // Ajuste o caminho para o seu modelo de usuário
import bcrypt from 'bcryptjs';
import { expect } from 'chai'; // Importa expect do Chai para asserções
import dotenv from 'dotenv';
import connectToMongoDB from '../db/connectToMongoDB.js'

dotenv.config()

let currentUser; // Simula o usuário logado durante os testes
let lastResponse; // Armazena a resposta da última requisição HTTP (se aplicável)
let error; // Captura erros para validação em steps Then


BeforeAll(async () => {
    await connectToMongoDB(); // Use uma URI específica para testes
    await User.deleteMany({}); // Limpa a coleção antes de começar
  });
  
  AfterAll(async () => {
    await mongoose.connection.close();
  });

  // criação de test setup (fixture)
  Given('o usuário {string} está logado como {string}', async (username, role) => {
    currentUser = await User.create({
      Name: username,
      Email: `${username}@test.com`,
      CPF: '000.000.000-00',
      Password: await bcrypt.hash('123456', 10),
      Role: 'admin'
    });
  });
  
  Given('não existe um usuário com email {string} ou CPF {string} no sistema', async (userEmail, userCpf) => {
    // Verifica diretamente no banco de dados
    const userByEmail = await User.findOne({ 
        $or: [
        { Email: userEmail },
        { CPF: userCpf }
        ]
    });
    
    // provisorio
    // Se encontrar algum usuário, remove para garantir o estado inicial
    if (userByEmail) {
        await User.deleteOne({ _id: userByEmail._id });
    }
  });

  When('{string} cria um novo usuário com:', async (adminName, dataTable) => {
    const userData = dataTable.hashes()[0];
    try {
      const response = await request(app)
        .post('/admin/register')
        .set('X-User-Id', currentUser._id.toString()) // ID do usuário admin/seed
        .set('X-User-Role', currentUser.role) // 'admin' ou 'seed'
        .send({
            Name: 'Teste',
            Email: 'teste@test.com',
            CPF: '1234',
            Password: '123456',
            Role: 'comum'
          });
        
        console.log('Status da criação:', lastResponse.status);
    } catch (err) {
      console.error('Erro na criação:', err.response?.body || err.message);
      throw err; // Propaga o erro para o teste falhar
    }
  });

Then('o sistema registra o usuário com CPF {string} com os dados:', async (userCpf, dataTable) => {
    const expectedData = dataTable.hashes()[0];
    const user = await User.findOne({ CPF: userCpf });
 
  // 3. Verificação robusta
  expect(user, `Usuário com CPF ${userCpf} não foi encontrado no banco`).to.exist;
  expect(user.Name).to.equal(expectedData.Name);
  expect(user.Email).to.equal(expectedData.Email);
  
  // 4. Verifica CPF em ambos os formatos
  expect([userCpf, normalizedCpf]).to.include(user.CPF);
  });
