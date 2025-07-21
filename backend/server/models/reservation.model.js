import mongoose from "mongoose"; //FORMATO DO MEU DADO NO DB (ENTIDADE/ENTIDADED ASSOCIATIVA)
//import QUARTO, USER
// UNICIDADE DE QUARTO X INTERVALO DE TEMPO GARANTIDA NO SERVICE.

const reservationSchema = new mongoose.Schema({
    Preco: Number,
    CheckIN: Date,
    CheckOUT: Date,
    Quarto: {
        type: String,
        required: true
    },
    Hospede: {
        User: String,
        required: true
    },
    Pagamento: {
        type: Number,
        required:true
    }
    // createdAt, updatedAt
}, {timestamps: true})

const Reservation = mongoose.model("Reservation", reservationSchema)

export default User