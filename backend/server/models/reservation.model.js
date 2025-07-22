import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    Preco: Number,
    CheckIN: Date,
    CheckOUT: Date,
    // ALTERAÇÃO: 'Quarto' agora é uma referência de objeto (ObjectId) para o modelo 'Room'.
    Quarto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    // ALTERAÇÃO: 'Hospede' agora é uma referência de objeto (ObjectId) para o modelo 'User'.
    Hospede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Pagamento: {
        type: Number,
        required: true
    },
    // NOVO CAMPO: Para a funcionalidade de compartilhar reserva.
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

// ALTERAÇÃO: Exportação corrigida de 'User' para 'Reservation'.
export default Reservation;