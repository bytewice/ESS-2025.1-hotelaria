import mongoose from "mongoose"

const credit_cardSchema = new mongoose.Schema({
    nome_cartao: {
        type: String,
        required: true
    },

    nome: {
        type: String,
        required:true
    },
    
    numero_cartao: {
        type: Number,
        required:true
    },

    validade: {
        type: String,
        required: true
    },

    CVV: { 
        type: Number,
        required: true
    }

}, {timestamps: true})

const credit_card  = mongoose.model("Credit Card", credit_cardSchema)

export default credit_card

