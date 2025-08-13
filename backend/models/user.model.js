import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: { // Campo: Name (string, obrigatório)
        type: String,
        required: true
    },
    Email: { // Campo: Email (string, obrigatório, único)
        type: String,
        required: true,
        unique: true
    },
    CPF: { // Campo: CPF (número, obrigatório, único)
        type: String, // mudei para string pra evitar perder os dígitos quando o cpf começa com 0, ex 001.123.456-16 
        required:true,
        unique: true
    },
    Password: { // Campo: Password (string, obrigatório, mínimo 6 caracteres)
        type: String,
        required: true,
        minlength: 6
    }
    // --- NOVO CAMPO ---
    //role: { // Campo: role (string, com valores 'comum' ou 'admin', padrão 'comum')
     //   type: String,
       // enum: ['comum', 'admin','seed'], //unica diferença é q o seed pode criar outros admins
        //default: 'comum'
    //}
    // createdAt, updatedAt (estes são adicionados pelo timestamps: true)
}, { discrimanorkey: 'tipo', timestamps: true })

const User = mongoose.model("User", userSchema)

export default User