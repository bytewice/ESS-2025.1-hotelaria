import User from "./user.model.js"
import mongoose from 'mongoose'

const AvaliacaoSchema = new mongoose.Schema({
    texto: String,
    nota: Number,
    data: { type: Date, default: Date.now }
})

const MetodoDePagamentoSchema = new mongoose.Schema({
    tipo: String
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