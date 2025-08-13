import User from "./user.model.js"
import mongoose from 'mongoose'

const Admin = User.discriminator("Admin", new mongoose.Schema({
    Num: Number,
}))

export default Admin