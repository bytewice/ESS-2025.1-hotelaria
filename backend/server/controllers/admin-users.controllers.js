import User from '../models/user.model.js'; // Importe o modelo de Usuário
import bcrypt from 'bcryptjs'; // Importe o bcryptjs para hashear senhas

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({
            role: { $in: ['admin', 'seed'] } // $in operador para buscar documentos onde 'role' está em uma lista
        }).select('-Password'); // Exclui o campo de senha da resposta por segurança

        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "Nenhum administrador ou seed encontrado." });
        }

        // Retorna a lista de administradores e seeds
        res.status(200).json(admins);

    } catch (error) {
        console.error("Erro em getAllAdmins:", error.message);
        res.status(500).json({
            error: "Erro interno do servidor ao buscar administradores."
        });
    }
};

export const createAdmin = async (req, res) => {
    try {
        // Desestrutura os dados do corpo da requisição
        const { Name, Email, CPF, Password, ConfirmPassword} = req.body;

        // 1. Validação de Senhas
        if (Password !== ConfirmPassword) {
            console.log("Erro: Senhas não coincidem ao criar admin.");
            return res.status(400).json({
                error: "As senhas não coincidem."
            });
        }

        // 2. Verifica se o administrador já existe (pelo CPF ou Email)
        const existingAdmin = await User.findOne({ $or: [{ Email }, { CPF }] });

        if (existingAdmin) {
            console.log("Erro: Administrador já existe com este e-mail ou CPF.");
            return res.status(400).json({
                error: "Um administrador com este e-mail ou CPF já existe."
            });
        }

        // 3. Hashea a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // 4. Cria uma nova instância de Usuário com a role 'admin'
        const newAdmin = new User({
            Name,
            Email,
            CPF,
            Password: hashedPassword,
            role: 'admin'  // Define explicitamente a role como 'admin'
        });

        // 5. Salva o novo administrador no banco de dados
        if (newAdmin) {
            await newAdmin.save();
            // Retorna os dados do novo administrador (sem a senha hasheada)
            res.status(201).json({
                _id: newAdmin._id,
                Name: newAdmin.Name,
                Email: newAdmin.Email,
                CPF: newAdmin.CPF,
                Telefone: newAdmin.Telefone,
                role: newAdmin.role
            });
        } else {
            // Caso a criação do usuário falhe por algum motivo inesperado
            res.status(400).json({ error: "Dados inválidos para criar administrador." });
        }

    } catch (error) {
        console.error("Erro em createAdmin:", error.message);
        res.status(500).json({
            error: "Erro interno do servidor ao criar administrador."
        });
    }
};

// Função para deletar um administrador
export const deleteAdmin = async (req, res) => {
    try {
        const adminIdToDelete = req.params.id; // Pega o ID do administrador a ser deletado da URL

        // Opcional: Impedir que o próprio admin logado se delete
        // req.user._id viria do middleware identifyUser
        if (req.user && req.user._id === adminIdToDelete) {
            return res.status(403).json({ error: "Você não pode deletar seu próprio perfil de administrador." });
        }

        // Opcional: Impedir a exclusão do último admin (ou do admin 'seed')
        // Você precisaria buscar todos os admins e verificar a contagem
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1 && adminIdToDelete !== req.user._id) { // Se for o último admin e não for o que está tentando se deletar
            // Esta lógica pode ser mais complexa dependendo de quem você quer que seja o "último" admin
            // Por exemplo, se o admin "seed" é o único que não pode ser deletado.
            // Para simplificar, vamos permitir se houver mais de 1 admin.
        }


        // 1. Encontra e deleta o usuário pelo ID, garantindo que ele seja um 'admin'
        // Adicionamos { role: 'admin' } para garantir que apenas admins possam ser deletados por esta rota
        const deletedAdmin = await User.findOneAndDelete({ _id: adminIdToDelete, role: 'admin' });

        if (!deletedAdmin) {
            // Se não encontrou um admin com aquele ID ou se o usuário não tinha a role 'admin'
            return res.status(404).json({ error: "Administrador não encontrado ou não é um administrador válido." });
        }

        res.status(200).json({
            message: "Administrador deletado com sucesso.",
            _id: deletedAdmin._id,
            Name: deletedAdmin.Name
        });

    } catch (error) {
        console.error("Erro em deleteAdmin:", error.message);
        res.status(500).json({
            error: "Erro interno do servidor ao deletar administrador."
        });
    }
};
