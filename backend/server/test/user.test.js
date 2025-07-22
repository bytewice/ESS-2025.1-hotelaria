import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs';
import { expect } from '@jest/globals';
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

Given('existe um usuário de CPF {string} no sistema', async function (userCPF) {
    // Verifica se o cliente "Charles" não existe no DB
})

/*
Given('não existe um usuário de CPF {string} no sistema', async function (clientName) {}

Given('existe um usuário de CPF {string} no sistema', async function (clientName) {}

Given('existe um usuário com nome {string} e CPF {string} no sistema', async function (clientName) {}

Given('existe um usuário de CPF {string} e de senha {string} no sistema', async function (clientName) {}

When('ele envia uma requesição para editar sua senha para {string}', function (senhaUser) {}

When('é enviada uma requisição para cadastrar um novo user com:', function (adminName, dataTable) {}

When('o usuário {string} inicia o cadastro do novo usuário com os dados:', function (adminName) {}

When('é enviada uma requesição para mudar o seu nome para {string}', function (newName) {}

When('o usuário de CPF {string} envia um requesição para editar seu CPF para {string}', function (oldCpf, newCpf) {}

When('é enviada uma requesição para remover o usuário com CPF igual à {string}', function (adminName) {}

When('é enviada uma requesição para remover o usuário com CPF igual à {string}', function (adminName) {}

When('é enviada uma requesição para remover o usuário com CPF igual à {string}', function (adminName) {}

Then('o sistema retorna a mensagem {string}', function (expectedErrorMessage, expectedStatus) {}

Then('o novo usuário de CPF {string} faz parte do sistema', function (expectedErrorMessage) {}

Then('o sistema exibe a mensagem de erro {string} com status {int}', function (expectedErrorMessage, expectedStatus) {}

Then('não existe usuário de CPF "321321321-24" cadastrado no sistema', function (expectedErrorMessage, expectedStatus) {}

Then('o usuário de CPF {string} continua com a senha "strings', function (expectedErrorMessage, expectedStatus) {}

Then('o usuário de CPF "300300300-30" continua com a senha "123456"', function (expectedErrorMessage, expectedStatus) {}*/