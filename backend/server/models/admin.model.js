import User from "./user.model.js"
import mongoose from 'mongoose'

const Admin = User.discriminator("Admin", new mongoose.Schema({
    //promocoes
    //?
}))

export default Admin