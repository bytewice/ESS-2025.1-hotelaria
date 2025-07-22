// test/delete-admin-steps.js

import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../index.js'; // Ajuste o caminho para a sua instância do Express
import mongoose from 'mongoose';
import User from '../models/user.model.js'; // Ajuste o caminho para o seu modelo de usuário
import bcrypt from 'bcryptjs';
import { expect } from 'chai'; // Importa expect do Chai para asserções

// --- Configuração e Variáveis de Ambiente para Teste ---
// Estas variáveis garantem que os testes rodem em um ambiente isolado.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'super_secret_test_key';
process.env.MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/hotelaria_cucumber_delete_test';

// Variáveis de contexto que serão compartilhadas entre os steps do cenário
let adminPrincipalId;
let adminPrincipalRole;
let brunaoId;
let httpResponse;

// --- Hooks do Cucumber para Setup e Teardown do Banco de Dados ---

// Executado uma vez antes de todos os cenários neste arquivo de steps
BeforeAll(async function () {
    console.log('--- BeforeAll: Conectando ao MongoDB de teste e limpando dados ---');
    await mongoose.connect(process.env.MONGO_DB_URI);
    await User.deleteMany({}); // Limpa a coleção de usuários para garantir um estado limpo

    // Cria o usuário "Admin Principal" (seed) que será usado para realizar a deleção
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordSeed = await bcrypt.hash('seedpassword', salt);
    const adminPrincipalUser = await User.create({
        Name: 'Admin Principal',
        Email: 'admin.principal@hotelaria.com',
        CPF: '00000000001',
        Password: hashedPasswordSeed,
        Telefone: '11999999999',
        role: 'seed'
    });
    adminPrincipalId = adminPrincipalUser._id.toString();
    adminPrincipalRole = 'seed';

    console.log('--- BeforeAll: Setup inicial concluído ---');
});

// Executado uma vez depois de todos os cenários neste arquivo de steps
AfterAll(async function () {
    console.log('--- AfterAll: Desconectando do MongoDB de teste e limpando dados ---');
    await User.deleteMany({}); // Limpa a coleção de usuários após os testes
    await mongoose.connection.close();
    console.log('--- AfterAll: Desconectado ---');
});

// --- Definições dos Steps (Given, When, Then) ---

Given('existe um usuário {string} com função {string}', async function (userName, role) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword', salt);
    let user;

    if (userName === 'brunao' && role === 'admin') {
        user = await User.create({
            Name: userName,
            Email: 'brunao@hotelaria.com',
            CPF: '00000000002',
            Password: hashedPassword,
            Telefone: '11988888888',
            role: role
        });
        brunaoId = user._id.toString(); // Armazena o ID do brunao
    } else if (userName === 'Admin Principal' && role === 'seed') {
        // Este usuário já é criado no BeforeAll, apenas verifica se o ID corresponde
        const existingAdminPrincipal = await User.findOne({ Email: 'admin.principal@hotelaria.com' });
        expect(existingAdminPrincipal).to.not.be.null;
        expect(existingAdminPrincipal._id.toString()).to.equal(adminPrincipalId);
    } else {
        throw new Error(`Criação de usuário não mapeada para: ${userName} com função ${role}`);
    }
    console.log(`Usuário "${userName}" (${role}) criado/verificado.`);
});

When('{string} tenta deletar o usuário {string}', async function (deleterName, targetUserName) {
    // Verifica se o "Admin Principal" é quem está realizando a ação
    expect(deleterName).to.equal('Admin Principal');
    expect(this.loggedInUserId).to.equal(adminPrincipalId);
    expect(this.loggedInUserRole).to.equal(adminPrincipalRole);

    // Faz a requisição DELETE para a rota de deleção
    httpResponse = await request(app)
        .delete(`/api/admin/delete-user/${brunaoId}`) // Usa o ID de brunao
        .set('X-User-Id', adminPrincipalId)     // Passa o ID do Admin Principal
        .set('X-User-Role', adminPrincipalRole); // Passa a role do Admin Principal

    console.log(`Admin Principal tentou deletar "${targetUserName}". Status: ${httpResponse.statusCode}`);
});

Then('{string} é removido da lista de usuários', async function (deletedUserName) {
    // Verifica o status da resposta HTTP
    expect(httpResponse.statusCode).to.equal(200); // Espera 200 OK para deleção bem-sucedida
    expect(httpResponse.body.message).to.equal('User deleted successfully'); // Mensagem de sucesso esperada (ajuste conforme sua API)

    // Verifica se o usuário foi realmente removido do banco de dados
    const userInDb = await User.findById(brunaoId);
    expect(userInDb).to.be.null; // O usuário não deve ser encontrado no DB

    // Opcional: Verifica a lista de usuários para confirmar a ausência
    const resList = await request(app)
        .get('/api/admin/all-admin')
        .set('X-User-Id', adminPrincipalId)
        .set('X-User-Role', adminPrincipalRole);

    expect(resList.statusCode).to.equal(200);
    const foundUser = resList.body.find(u => u.Name === deletedUserName);
    expect(foundUser).to.be.undefined; // O usuário não deve estar na lista
    console.log(`Usuário "${deletedUserName}" removido e verificado.`);
});