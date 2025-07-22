import generateTokenAndSetCookie from '../utils/generateToken.js'
import User from '../models/user.model.js'
import UserComum from '../models/user_comum.model.js'
import bcrypt from 'bcryptjs'

export const signupUser = async (req, res) => {
    try {
        const { Name, Email, CPF, Password, Telefone } = req.body || {}

        if (!Name || !Email || !CPF || !Password) {
            console.log("Required elements missing")
            return res.status(400).json({
                error: "Elementos faltando"
            })
        }

        if (Password.length < 6) {
            console.log("A senha deve ter 6 ou mais caracteres")
            return res.status(400).json({
                error: "A senha deve ter 6 ou mais caracteres"
            })
        }

        const user = await User.findOne({ $or: [{ CPF }, { Email }] })

        if (user) {
            console.log("Já existe usuário")
            return res.status(400).json({
                error: "Já existe usuário"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt)

        const newUser = new UserComum({
            Name,
            Email,
            CPF,
            Password: hashedPassword,
            Telefone,
            Avaliacoes: [],
            Metodos: [],
        })

        await newUser.save()
        generateTokenAndSetCookie(newUser._id, res)
        res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user:{
            _id: newUser._id,
            Name: newUser.Name,
            Email: newUser.Email,
            CPF: newUser.CPF,
            Telefone: newUser.Telefone,
            }
        })

    } catch (error) {
        console.log("Error in signup:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { CPF, Password } = req.body || {}
        const user = await UserComum.findOne({ CPF })

        if (!user) {
            console.log("Invalid credentials - user not found")
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(Password || "", user.Password)

        if (!isPasswordCorrect) {
            console.log("Invalid credentials - wrong password")
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            CPF: user.CPF
        })

    } catch (error) {
        console.log("Error in login:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
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

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const updates = { ...req.body }

        if (updates.Password) {
            if (updates.Password.length < 6) {
                return res.status(400).json({
                    error: "A senha deve ter 6 ou mais caracteres"
                })
            }
            updates.Password = await bcrypt.hash(updates.Password, 10)
        }

        const orConditions = []
        if (updates.Email) {
            orConditions.push({ Email: updates.Email })
        }
        if (updates.CPF) {
            orConditions.push({ CPF: updates.CPF })
        }
        if (orConditions.length > 0) {
            const searchUser = await User.findOne({ _id: { $ne: userId }, $or: orConditions })
            if (searchUser) {
                return res.status(400).json({ error: "Email ou CPF em uso" })
            }
        }

        const updatedUser = await UserComum.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({ message: "Edição concluída", user: updatedUser })

    } catch (error) {
        console.log("Error in Update:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await UserComum.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({ message: "Removido com sucesso" })
    } catch (error) {
        console.log("Error in deleteUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await UserComum.find({})
        return res.status(200).json(users)
    } catch (error) {
        console.log("Error in getAllUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await UserComum.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const addMetodo = async (req, res) => {
    try {
        const userId = req.params.id
        const { metodo } = req.body

        if (!metodo) {
            return res.status(400).json({ error: "Metodo field is empty" })
        }

        const updateMetodo = { $addToSet: { Metodos: metodo } }
        const updateMetodoUser = await UserComum.findByIdAndUpdate(
            userId, updateMetodo, { new: true }
        )
        if (!updateMetodoUser) {
            return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json({ message: "Metodo added", user: updateMetodoUser })

    } catch (error) {
        console.log("Error in addMetodo:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
