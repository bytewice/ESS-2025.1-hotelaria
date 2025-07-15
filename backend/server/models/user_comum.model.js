import User from "./user.model.js"
import mongoose from 'mongoose'

const AvaliacaoSchema = new mongoose.Schema({
    texto: String,
    nota: Number,
    data: { type: Date, default: Date.now }
})

const MetodoDePagamentoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    //ADICIONAR CARTAO
    //REMOVER CARTAO
    //CADASTRO DE PROMOCAO
    //EDITAR PROMOCAO
    //REMOVER PROMOCAO
})

const UserComum = User.discriminator("Comum", new mongoose.Schema({
    Telefone: Number,
    Avaliacoes: {
        type: [AvaliacaoSchema]
    },
    Metodos: {
        type: [MetodoDePagamentoSchema]
    }
}))

export default UserComum