import User from "./user.model.js"

const AvaliacaoSchema = new mongoose.Schema({
    texto: String,
    nota: Number,
    data: { type: Date, default: Date.now }
})

const MetodoDePagamento = new mongoose.Schema({
    tipo: String
})

const UserComum = user.discriminator("Comum", new mongoose.schema({
    Telefone: Number,
    Avaliacoes: {
        type: [AvaliacaoSchema]
    },
    Metodos: {
        type: [MetodoDePagamento]
    }
}))

export default UserComum