import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber'
import request from 'supertest'
import app from '../index.js'
import mongoose from 'mongoose'
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs'
import { expect } from '@jest/globals'
import connectToMongoDB from '../db/connectToMongoDB.js'

let userId;
let existingCpf;
let httpResponse;
let requestBody;

BeforeAll(async function () {
    console.log('Cucumber BeforeAll: Conectando ao MongoDB e limpando dados...')
    await mongoose.connect(process.env.MONGO_DB_URI_TEST)
    await User.deleteMany({})
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('adminpassword', salt)
    const aUser = await UserComum.create({
        Name: 'Bob',
        Email: 'bob@example.com',
        CPF: '11111111111',
        Password: hashedPassword,
        Telefone: '99999999999'
    })
    userId = aUser._id.toString()
    existingCpf = '12012012014'
    const hashedPasswordExisting = await bcrypt.hash('existingpass', salt)
    await UserComum.create({
        Name: 'Existing User',
        Email: 'existing@example.com',
        CPF: existingCpf,
        Password: hashedPasswordExisting,
        Telefone: '99999999990'
    })
    console.log('Cucumber BeforeAll: Setup inicial concluído.')
})

AfterAll(async function(){
    console.log('Cucumber AfterAll: Desconectando do MongoDB...')
    await mongoose.connection.close()
    console.log('Cucumber AfterAll: Desconectado.')
})

Given('não existe um usuário de CPF {string} no sistema', async function (cpf) {
    await UserComum.deleteOne({ CPF: cpf })
})

Given('existe um usuário de CPF {string} no sistema', async function (cpf) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    await UserComum.findOneAndUpdate(
        { CPF: cpf },
        { 
            $setOnInsert: { // $setOnInsert só aplica estes campos na criação (upsert)
                Name: 'Usuário de Teste Padrão',
                Email: `teste_${cpf}@example.com`,
                Password: hashedPassword,
            }
        },
        { upsert: true } // Cria o documento se não for encontrado
    )
})

Given('existe um usuário com nome {string} e CPF {string} no sistema', async function (userName, cpf) {
const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    await UserComum.findOneAndUpdate(
        { CPF: cpf },
        { 
            $set: { Name: userName }, // Garante que o nome esteja atualizado
            $setOnInsert: {
                Email: `teste_${cpf}@example.com`,
                Password: hashedPassword,
            }
        },
        { upsert: true }
    );
})

Given('existe um usuário de CPF {string} e de senha {string} no sistema', async function (cpf, plainPassword) {
this.currentUserCpf = cpf;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    const user = await UserComum.findOneAndUpdate(
        { CPF: cpf },
        { 
            $set: { Password: hashedPassword },
            $setOnInsert: {
                Name: 'Usuário de Teste de Senha',
                Email: `teste_senha_${cpf}@example.com`,
            }
        },
        { upsert: true, new: true }
    );
    // Armazena o ID do usuário para simular que ele está logado
    this.currentUserId = user._id.toString();
})

When('ele envia uma requesição para editar sua senha para {string}', async function (newPassword) {
    this.response = await request(app)
        .put(`/api/users/${this.currentUserId}`) // Supondo uma rota de update por ID
        .send({ Password: newPassword });
})

When('é enviada uma requisição para cadastrar um novo user com:', async function (dataTable) {
    const requestBody = dataTable.rowsHash();
    this.response = await request(app)
        .post('/api/auth/signup') // Rota de cadastro
        .send(requestBody);
})

When('é enviada uma requesição para mudar o seu nome para {string}', async function (newName) {
    this.response = await request(app)
        .put(`/api/users/${this.currentUserId}`)
        .send({ Name: newName });
})

When('o usuário de CPF {string} envia um requesição para editar seu CPF para {string}', async function (originalCpf, newCpf) {
    const userToUpdate = await UserComum.findOne({ CPF: originalCpf });
    
    this.response = await request(app)
        .put(`/api/users/${userToUpdate._id}`)
        .send({ CPF: newCpf });
});

// Nota: os 3 "Whens" para remover usuário são idênticos, então uma única implementação serve para todos
When('é enviada uma requisição para remover o usuário com CPF igual à {string}', async function (cpf) {
    const userToDelete = await UserComum.findOne({ CPF: cpf });
    
    if (!userToDelete) throw new Error(`Usuário com CPF ${cpf} não foi encontrado para deleção no setup do teste.`);

    this.response = await request(app)
        .delete(`/api/users/${userToDelete._id}`);
})

Then('o sistema retorna a mensagem {string}', function (expectedMessage) {
    const responseMessage = this.response.body.message || this.response.body.error;
    expect(responseMessage).toEqual(expectedMessage);
})

Then('o novo usuário de CPF {string} faz parte do sistema', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf });
    expect(user).not.toBeNull();
})

Then('o sistema exibe a mensagem de erro {string} com status {int}', function (expectedMessage, expectedStatus) {
    expect(this.response.statusCode).toEqual(expectedStatus);
    expect(this.response.body.error).toEqual(expectedMessage);
})

Then('não existe usuário de CPF {string} cadastrado no sistema', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf });
    expect(user).toBeNull();
})

Then('o usuário de CPF {string} continua com a senha {string}', async function (cpf, plainPassword) {
    const user = await UserComum.findOne({ CPF: cpf });
    expect(user).not.toBeNull();
    const isMatch = await bcrypt.compare(plainPassword, user.Password);
    expect(isMatch).toBe(true);
})
