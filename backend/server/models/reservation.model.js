import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    Quarto: {
        type: String,
        required: true
    },
    Hospede: {
        User: String,
        required: true,
        unique: true
    },
    Pagamento: {
        MetodoDePagamento: Number,
        required:true,
        unique: true
    },
    Data: {
        type: String,
        required: true,
        minlength: 6
    }
    // createdAt, updatedAt
}, {timestamps: true })

const User = mongoose.model("User", userSchema)

export default User