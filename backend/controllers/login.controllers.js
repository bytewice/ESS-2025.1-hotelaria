import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(400).json({ error: "Credenciais inválidas" });
        }

        const isPasswordCorrect = await bcrypt.compare(Password, user.Password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Credenciais inválidas" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            role: user.role
        });
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};