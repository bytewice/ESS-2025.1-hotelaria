// middlewares/authMiddleware.js

// Middleware para "identificar" o usuário sem um processo de login formal.
// Para fins da disciplina, ele assume que o ID e a role do usuário são passados
// em cabeçalhos HTTP personalizados (X-User-Id e X-User-Role).
export const identifyUser = (req, res, next) => {
    const userId = req.headers['x-user-id'];     // Ex: X-User-Id: 66a9d0a7a3b4c5d6e7f8a9b0
    const userRole = req.headers['x-user-role']; // Ex: X-User-Role: admin ou X-User-Role: comum

    console.log('Middleware identifyUser: userId recebido:', userId);
    console.log('Middleware identifyUser: userRole recebido:', userRole);
    // Se um ID de usuário for fornecido, anexamos as informações à requisição.
    // Caso contrário, a requisição não será "identificada" para rotas protegidas.
    if (userId) {
        req.user = {
            _id: userId, // Usamos _id para ser consistente com o Mongoose
            Role: userRole || 'comum' // Assume 'comum' se a role não for especificada
        };
        next(); // Continua para o próximo middleware ou rota
    } else {
        // Se X-User-Id não for fornecido, a requisição não pode ser autenticada.
        // Retorna um erro 401 para indicar que a autenticação é necessária.
        return res.status(401).json({ message: 'Autenticação necessária: X-User-Id é obrigatório.' });
    }
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permissão negada. Você não tem a role necessária.' });
        }
        next();
    };
};