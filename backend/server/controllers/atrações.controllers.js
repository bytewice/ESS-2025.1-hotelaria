import generateTokenAndSetCookie from '../utils/generateToken.js'
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs'

export const getAllAtration = async(req, res) => {
    try{
        

    } catch(error){
        console.log("Error in get atrations:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

