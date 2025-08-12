console.log('--- O ARQUIVO DE STEPS FOI CARREGADO COM SUCESSO ---')
import { Given, When, Then, BeforeAll, AfterAll} from '@cucumber/cucumber'
import request from 'supertest'
import app from '../index.js'
import mongoose from 'mongoose'
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import dotenv from 'dotenv'
dotenv.config()

BeforeAll(async function () {
    console.log('Cucumber BeforeAll: Conectando ao MongoDB de Teste e limpando dados...')
    if (!process.env.MONGO_DB_URI) {
        console.log('A variável de ambiente MONGO_DB_URI_TEST não está definida.')
        throw new Error("A variável de ambiente MONGO_DB_URI_TEST não está definida.")
    }
    //console.log('A')
    await mongoose.connect(process.env.MONGO_DB_URI)
    //console.log('B')
    await User.deleteMany({})
    console.log('Cucumber BeforeAll: Setup inicial concluído.')
})

AfterAll(async function(){
    console.log('Cucumber AfterAll: Limpando dados e desconectando do MongoDB...')
    await User.deleteMany({}) // Limpa a coleção base no final
    await mongoose.connection.close()
    console.log('Cucumber AfterAll: Desconectado.')
})

Given('não existe um usuário com CPF {string} no sistema', async function (cpf) {
    await UserComum.deleteOne({ CPF: cpf })
})

Given('existe um usuário de CPF {string} no sistema', async function (cpf) {
    this.currentUserCpf = cpf
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)
    

    const user = await UserComum.findOneAndUpdate(
        { CPF: cpf },
        { 
            $set: { Password: hashedPassword },
            $setOnInsert: {
                Name: 'nomequalquer_${cpf}',
                Email: `teste_senha_${cpf}@example.`,
            }
        },
        { upsert: true, new: true }
    )
    this.currentUserId = user._id.toString()
})

Given('existe um usuário com nome {string} e CPF {string} no sistema', async function (userName, cpf) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)
    this.currentUserCpf = cpf

    const user = await UserComum.findOneAndUpdate(
        { CPF: cpf },
        { 
            $set: { Password: hashedPassword },
            $setOnInsert: {
                Name: userName,
                Email: `teste_senha_${cpf}@example.com`,
            }
        },
        { upsert: true, new: true }
    )
    this.currentUserId = user._id.toString()

    
})

Given('existe um usuário de CPF {string} e de senha {string} no sistema', async function (cpf, plainPassword) {
    this.currentUserCpf = cpf // Guarda o CPF no contexto do cenário

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(plainPassword, salt)
    
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
    )
    this.currentUserId = user._id.toString() // Guarda o ID para simular login
})

//-------------------------------------------------When----------------------------------------------

When('é enviada uma requisição para cadastrar um novo user com:', async function (dataTable) {
    //console.log('Raw:', dataTable.raw())
    //console.log('RowsHash:', dataTable.rowsHash())
    const requestBody = dataTable.rowsHash()
    this.response = await request(app)
        .post('/user/signup')
        .send(requestBody)
})

When('é enviada uma requisição para cadastrar um novo usuário com CPF igual a {string} e email {string}', async function (cpf,email) {
    const requestBody = {
        Name: 'Valdemar',
        Senha: 'senha12',
        Email: email,
        CPF: cpf,
        Telefone: '8193333-3333'
    }
    this.response = await request(app)
        .post('/user/signup')
        .send(requestBody)
})
When('ele envia uma requisição para editar sua senha para {string}', async function (newPassword) {
    this.response = await request(app)
        .put(`/user/${this.currentUserId}`)
        .send({ Password: newPassword, ConfirmPassword: newPassword })
})
When('é enviada uma requisição para mudar o seu nome para {string}', async function (newName) {
    const userToUpdate = await UserComum.findOne({ CPF: this.currentUserCpf })
    this.response = await request(app)
        .put(`/user/${userToUpdate._id}`)
        .send({ Name: newName })
})
When('o usuário de CPF {string} envia uma requisição para editar seu CPF para {string}', async function (originalCpf, newCpf) {
    const userToUpdate = await UserComum.findOne({ CPF: originalCpf })
    this.response = await request(app)
        .put(`/user/${userToUpdate._id}`)
        .send({ CPF: newCpf })
})
When('é enviada uma requisição para remover o usuário com CPF igual à {string}', async function (cpf) {
    const userToDelete = await UserComum.findOne({ CPF: cpf })
    if (!userToDelete) throw new Error(`Usuário com CPF ${cpf} não foi encontrado no setup do teste.`)
    
    this.response = await request(app)
        .delete(`/user/${userToDelete._id}`)
})

//----------------------------------------------------------Then----------------------------------------

Then('o sistema retorna a mensagem {string}', function (expectedMessage) {
    const responseMessage =
        this.response.body.message ||
        this.response.body.error ||
        this.response.body.data?.message

    expect(responseMessage).to.equal(expectedMessage)
})

Then('o novo usuário de CPF {string} faz parte do sistema', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user).to.not.be.null
})

Then('o sistema exibe a mensagem de erro {string} com status {int}', function (expectedMessage, expectedStatus) {
    const { statusCode, body } = this.response
    //console.log('STATUS:', statusCode)
    //console.log('BODY:', body)
    expect(statusCode).to.equal(expectedStatus)


    const message = body?.message || body?.error || body?.data?.message
    expect(message).to.equal(expectedMessage)
})

Then('o usuário de CPF {string} não está cadastrado no sistema', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user).to.be.null
})
Then('não existe usuário de CPF {string} cadastrado no sistema', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user).to.be.null
})

Then('o usuário de email {string} não foi registrado no sistema', async function (email) {
    const user = await UserComum.findOne({ Email: email })
    expect(user).to.be.null
})

Then('o campo nome do usuário de CPF {string} é alterado para {string}', async function (cpf, newName) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user.Name).to.equal(newName)
})

Then('o usuário continua com o CPF {string}', async function (cpf) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user).to.not.be.null
})

Then('o usuário de CPF {string} continua com a senha {string}', async function (cpf, plainPassword) {
    const user = await UserComum.findOne({ CPF: cpf })
    expect(user).to.not.be.null
    const isMatch = await bcrypt.compare(plainPassword, user.Password)
    expect(isMatch).to.be.true
})
