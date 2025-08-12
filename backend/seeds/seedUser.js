import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; 
import mongoose from 'mongoose';
import connectToMongoDB from '../db/connectToMongoDB.js';
import UserComum from '../models/user_comum.model.js';

dotenv.config();

const seedComumUser = async () => {

    await connectToMongoDB()

    try{

        console.log('Iniciando o seeding de Usuario...')

        const userData = {
            Name: 'User Qualquer',
            Email: 'user@qualquer.com',
            CPF: '00000000001', 
            Password: 'userpassword', // Esta senha será hasheada antes de salvar
            Telefone: '123456789', 
        }

        const existUser = await UserComum.findOne({$or:[{Email:userData.Email},{CPF:userData.CPF}]})
        if(existUser){
            console.log('User já existe com este e-mail ou CPF. Pulando o seeding.')
            return
        }

        const salt = await bcrypt.genSalt(10)
        userData.Password = await bcrypt.hash(userData.Password, salt)

        const newUser = new UserComum(userData)
        await newUser.save()
        console.log('User criado com Sucesso:')
        console.log({_id: newUser._id, Name:newUser.Name, Email:newUser.Email})

    }

    catch(error){
        console.error('Erro durante o seeding do User:', error.message)
    }finally{
        await mongoose.disconnect();
        console.log('Desconectado do MongoDB.')
    }
}

seedComumUser()