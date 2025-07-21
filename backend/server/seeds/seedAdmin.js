import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; 
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import connectToMongoDB from '../db/connectToMongoDB.js';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const seedAdminUser = async () => {
    // Conecta ao MongoDB
    await connectToMongoDB();

    try {
        console.log('Iniciando o seeding de administrador...');

        // Dados do administrador padrão que será criado
        const adminData = {
            Name: 'Admin Principal',
            Email: 'admin@hotelaria.com',
            CPF: '00000000000', 
            Password: 'adminpassword', // Esta senha será hasheada antes de salvar
            Telefone: '11999999999', 
            role: 'seed' 
        };

        const existingAdmin = await User.findOne({
            $or: [{ Email: adminData.Email }, { CPF: adminData.CPF }]
        });

        if (existingAdmin) {
            console.log('Administrador já existe com este e-mail ou CPF. Pulando o seeding.');
            return; // Sai da função sem criar um novo admin
        }

        // 2. Hashea a senha antes de salvar no banco de dados
        const salt = await bcrypt.genSalt(10);
        adminData.Password = await bcrypt.hash(adminData.Password, salt);

        // 3. Cria uma nova instância do modelo User com os dados do admin
        const newAdmin = new User(adminData);
        // 4. Salva o novo usuário seed no banco de dados
        await newAdmin.save();

        console.log('Administrador criado com sucesso:');
        console.log({
            _id: newAdmin._id,
            Name: newAdmin.Name,
            Email: newAdmin.Email,
            role: newAdmin.role
        });

    } catch (error) {
        console.error('Erro durante o seeding do administrador:', error.message);
    } finally {
        // Garante que a conexão com o MongoDB seja fechada após a operação
        await mongoose.disconnect();
        console.log('Desconectado do MongoDB.');
    }
};

// Executa a função de seed quando o script é chamado
seedAdminUser();