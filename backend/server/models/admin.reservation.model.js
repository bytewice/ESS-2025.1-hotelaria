import mongoose from "mongoose"; //FORMATO DO MEU DADO NO DB (ENTIDADE/ENTIDADED ASSOCIATIVA)

const reservationSchema = new mongoose.Schema({
    codigoReserva: {
        type: String,
        required: true,
        unique: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    quarto: {
        type: String,
        required: true
    },
    hospedeCpf: {
        type: String,
        required: true
    },
    pagamento: Number,
}, {timestamps: true});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;