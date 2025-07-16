import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    CPF: {
        type: Number,
        required:true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    }
    // createdAt, updatedAt
}, { discrimanorkey: 'tipo', timestamps: true })

const User = mongoose.model("User", userSchema)

export default User