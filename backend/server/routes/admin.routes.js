import express from 'express';
import { getAllUser, getUser, updateUser, deleteUser, signupUser } from '../controllers/user_perfil.controllers.js';
import { identifyUser, isAdmin } from '../middlewares/authMiddleware.js';
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'

const router = express.Router()

// criar e editar usuários comuns
// deletar usuários comuns

/* JSON */

// GET
router.get('/', identifyUser, isAdmin, getAllUser)
router.get('/:id', identifyUser, isAdmin, getUser)

// POST
router.post('/register', identifyUser, isAdmin, signupUser) //create?
//router.post('/admins/create', createAdmin); // Criar um novo administrador

// PUT
router.put('/:id', identifyUser, isAdmin, updateUser)
//router.put('/admins/:id/role', updateAdminRole); // Alterar a role de um usuário para admin/comum

// DELETE
//router.delete('/admins/:id', deleteAdmin); // Deletar um administrador router.delete('/:id', deleteUser)

// ... lembrar de colocar isso no index.js para aplicar tambem antes de entrar em /admin
//router.get('/users', identifyUser, isAdmin, getAllUser);

export default router