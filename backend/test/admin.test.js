// step_definitions/admin_user_creation_steps.js

import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../index.js'; // Importa sua instância do Express
import mongoose from 'mongoose';
import User from '../models/User.js'; // Importa seu modelo de usuário
import bcrypt from 'bcryptjs';
import { expect } from '@jest/globals'; // Usando expect do Jest

// Mock de variáveis de ambiente para o ambiente de teste
process.env.JWT_SECRET = process.env.JWT_SECRET || 'super_secret_test_key';
process.env.MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/hotelaria_cucumber_test'; // DB de teste dedicado

// Variáveis para o contexto do cenário (acessíveis via 'this' nos steps)
let adminId;
let adminRole;
let existingCpf;
let httpResponse;
let requestBody; // Para armazenar os dados do usuário a ser criado

// --- Hooks do Cucumber para setup e teardown do banco de dados ---

BeforeAll(async function () {
    console.log('Cucumber BeforeAll: Conectando ao MongoDB e limpando dados...');
    await mongoose.connect(process.env.MONGO_DB_URI);
    await User.deleteMany({}); // Limpa a coleção de usuários

    // Cria o usuário administrador "Bob" para os testes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt);
    const adminUser = await User.create({
        Name: 'Bob',
        Email: 'bob@example.com',
        CPF: '11111111111',
        Password: hashedPassword,
        Telefone: '99999999999',
        role: 'admin'
    });
    adminId = adminUser._id.toString(); // Armazena o ID do admin para uso nos steps
    adminRole = 'admin';

    // Cria um usuário com o CPF que já estará registrado
    existingCpf = '12012012014';
    const hashedPasswordExisting = await bcrypt.hash('existingpass', salt);
    await User.create({
        Name: 'Existing User',
        Email: 'existing@example.com',
        CPF: existingCpf,
        Password: hashedPasswordExisting,
        Telefone: '99999999990',
        role: 'comum'
    });
    console.log('Cucumber BeforeAll: Setup inicial concluído.');
});

AfterAll(async function () {
    console.log('Cucumber AfterAll: Desconectando do MongoDB...');
    await mongoose.connection.close();
    console.log('Cucumber AfterAll: Desconectado.');
});

// --- Definições dos Steps (Given, When, Then) ---

Given('o usuário {string} está logado no sistema com perfil {string}', function (userName, userProfile) {
    // Neste cenário, "Bob" é o admin de teste criado no BeforeAll
    // A simulação de "estar logado" é feita passando os headers X-User-Id e X-User-Role
    // que serão usados no step 'When'
    expect(userName).toEqual('Bob');
    expect(userProfile).toEqual('administrador');
    this.adminId = adminId; // Garante que o ID do admin está no contexto do cenário
    this.adminRole = adminRole; // Garante que a role do admin está no contexto do cenário
});

Given('o cliente {string} não possui cadastro no sistema', async function (clientName) {
    // Verifica se o cliente "Charles" não existe no DB
    const charles = await User.findOne({ Name: clientName });
    expect(charles).toBeNull();
});

Given('o CPF {string} está registrado no sistema por {string}', async function (cpf, existingUserName) {
    // Verifica se o CPF já existe no DB
    const existingUser = await User.findOne({ CPF: cpf });
    expect(existingUser).not.toBeNull();
    expect(existingUser.Name).toEqual(existingUserName);
    this.existingUserCpf = cpf; // Armazena o CPF existente para futuras verificações
});

When('o usuário {string} inicia o cadastro do novo usuário com os dados:', function (adminName, dataTable) {
    // Converte a DataTable do Gherkin para um objeto JavaScript
    const userData = dataTable.rowsHash();
    
    // Armazena os dados da requisição para serem enviados no próximo step
    requestBody = {
        Name: userData.Nome,
        Email: userData.Email,
        CPF: userData.CPF,
        Password: userData.Password,
        ConfirmPassword: userData.ConfirmPassword,
        Telefone: userData.Telefone,
        role: userData.Role // A role que o admin tenta atribuir
    };
    // console.log("Dados do requestBody:", requestBody); // Para depuração
});

When('confirma o cadastro', async function () {
    // Faz a requisição POST para a API, passando os headers
    httpResponse = await request(app)
        .post('/api/admin/users/create-system-user') // Sua rota para criar usuários por admin
        .set('X-User-Id', this.adminId)     // ID do admin logado
        .set('X-User-Role', this.adminRole) // Role do admin logado
        .send(requestBody);
    // console.log("Resposta da API:", httpResponse.body); // Para depuração
});

Then('o sistema exibe a mensagem de erro {string} com status {int}', function (expectedErrorMessage, expectedStatus) {
    expect(httpResponse.statusCode).toEqual(expectedStatus);
    expect(httpResponse.body.error).toEqual(expectedErrorMessage);
});

Then('o cliente cujo CPF é {string} continua com seus dados inalterados no sistema', async function (cpf) {
    const userAfterAttempt = await User.findOne({ CPF: cpf });
    expect(userAfterAttempt).not.toBeNull(); // O usuário original ainda existe
    expect(userAfterAttempt.Name).toEqual('Existing User'); // E seus dados não foram alterados
});

Then('o usuário {string} não foi registrado no sistema.', async function (clientName) {
    const charlesUser = await User.findOne({ Name: clientName });
    expect(charlesUser).toBeNull(); // Não deve ter um novo usuário com o nome de Charles
});
