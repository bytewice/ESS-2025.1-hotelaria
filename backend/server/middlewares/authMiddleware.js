// middlewares/authMiddleware.js

// Middleware para "identificar" o usuário sem um processo de login formal.
// Para fins da disciplina, ele assume que o ID e a role do usuário são passados
// em cabeçalhos HTTP personalizados (X-User-Id e X-User-Role).
export const identifyUser = (req, res, next) => {
    const userId = req.headers['x-user-id'];     // Ex: X-User-Id: 66a9d0a7a3b4c5d6e7f8a9b0
    const userRole = req.headers['x-user-role']; // Ex: X-User-Role: admin ou X-User-Role: comum

    // Se um ID de usuário for fornecido, anexamos as informações à requisição.
    // Caso contrário, a requisição não será "identificada" para rotas protegidas.
    if (userId) {
        req.user = {
            _id: userId, // Usamos _id para ser consistente com o Mongoose
            role: userRole || 'comum' // Assume 'comum' se a role não for especificada
        };
        next(); // Continua para o próximo middleware ou rota
    } else {
        // Se X-User-Id não for fornecido, a requisição não pode ser autenticada.
        // Retorna um erro 401 para indicar que a autenticação é necessária.
        return res.status(401).json({ message: 'Autenticação necessária: X-User-Id é obrigatório.' });
    }
};

// Middleware para verificar se o usuário identificado tem a role de 'admin'.
// Este middleware DEVE ser usado APÓS o identifyUser.
export const isAdmin = (req, res, next) => {
    // Verifica se req.user foi populado pelo identifyUser e se a role é 'admin'.
    if (!req.user || req.user.role !== 'admin') {
        // Se não for admin, retorna um erro 403 (Forbidden - Proibido).
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }
    next(); // Se for admin, continua para o próximo middleware ou rota
};

// Middleware mais genérico para autorizar múltiplas roles (opcional, mas flexível).
// Pode ser útil se você tiver mais tipos de usuários no futuro (ex: ['recepcionista', 'gerente']).
// export const authorizeRole = (roles) => {
//     return (req, res, next) => {
//         if (!req.user || !roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Permissão negada. Você não tem a role necessária.' });
//         }
//         next();
//     };
// };