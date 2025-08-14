import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Opcional, para buscar o usuário completo se necessário

export const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado: Token não fornecido.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agora req.user tem { userId: '...' }

        next();
    } catch (error) {
        console.error("Erro no middleware de proteção:", error.message);
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};