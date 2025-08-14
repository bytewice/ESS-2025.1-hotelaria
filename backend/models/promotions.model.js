import mongoose from "mongoose"

const promotionSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    data_inicio: {
        type: Date,
        required: true
    },
    
    data_fim: {
        type: Date,
        required: true
    },

    desconto: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Promotion  = mongoose.model("Promotion", promotionSchema)

export default Promotion

