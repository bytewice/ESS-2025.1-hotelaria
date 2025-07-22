import User from "./user.model.js"
import mongoose from 'mongoose'

const AvaliacaoSchema = new mongoose.Schema({
    texto: String,
    nota: Number,
    data: { type: Date, default: Date.now }
})

const MetodoDePagamentoSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    nome: { type: String, required: true },
    // Detalhes do cartão
    numero: String,
    validade: String,
    cvv: String
})

const UserComum = User.discriminator("Comum", new mongoose.Schema({
    Telefone: Number,
    Avaliacoes: [AvaliacaoSchema],
    Metodos: [MetodoDePagamentoSchema],
    savedRooms: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' 
    }]
}))

export default UserComum