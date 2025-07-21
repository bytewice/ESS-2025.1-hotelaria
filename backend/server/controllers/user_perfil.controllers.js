import generateTokenAndSetCookie from '../utils/generateToken.js'
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs'

export const signupUser = async(req, res) => {
    try{

        const {Name, Email, CPF, Password, ConfirmPassword, Telefone} = req.body

        if(Password !== ConfirmPassword){
            console.log("Password don't match");
            return res.status(400).json({
                error: "Password don't match"
            })
        }

        const user = await User.findOne({ CPF })

        if(user){
            console.log("User already exist")
            return res.status(400).json({
                error: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = new UserComum({
            Name,
            Email,
            CPF,
            Password: hashedPassword,
            Telefone,
            Avaliacoes: [],
            Metodos: [],
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                Name: newUser.Name,
                Email: newUser.Email,
                CPF: newUser.CPF,
                Telefone: newUser.Telefone,
            })
        }

    } catch (error) {
        console.log("Error in signup:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const loginUser = async(req, res) => {
    try{
        const {CPF, Password} = req.body
        const user = await UserComum.findOne({ CPF })
        const isPasswordCorrect = await bcrypt.compare(Password, user?.Password || "")

        if (!user || !isPasswordCorrect) { //user nn existe ou senha errada
            console.log("Invalid credentials")
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }
        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username
        })

    } catch(error){
        console.log("Error in login:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge:0})
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log("Error in logout:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const updateUser = async(req,res) => {
    try{
        const userId = req.params.id
        const updates = { ...req.body }

        if (updates.Password) {
            updates.Password = await bcrypt.hash(updates.Password, 10)
        }

        const updatedUser = await UserComum.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message:"User updated", user:updatedUser})

    } catch(error){
        console.log("Error in Update:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const deleteUser = async(req, res) => {
    try{
        const UserId = req.params.id
        const user = await UserComum.findByIdAndDelete(UserId)
        if(!user){
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message:"User sucessfully deleted"})
    } catch(error){
        console.log("Error in deleteUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

}

export const getAllUser = async(req, res) => {
    try{
        const users = await User.find({})
        return res.status(200).json(users)
    } catch(error){
        console.log("Error in getAllUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const getUser = async(req, res) => {
    try{
        const UserId = req.params.id
        const user = await UserComum.findById(UserId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json(user)
    } catch(error){
        console.log("Error in getUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const addMetodo = async(req, res) => {
    try{
        const userId = req.params.id
        const metodo = req.params.body

        if(!metodo){
            return res.status(400).json({ error: "Metodo field is empty"})
        }
        const updateMetodo = { $addToSet: {Metodos: metodo}}
        const updateMetodoUser = await UserComum.findByIdAndUpdate(
            userId, updateMetodo, {new: true}
        )
        if(!updateMetodoUser){
            return res.status(400).json({ error:"User not found"})
        }

        res.status(200).json({ message: "Metodo added", user: updateMetodoUser })

    } catch(error){
        console.log("Error in addCartao:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

