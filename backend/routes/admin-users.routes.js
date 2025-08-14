import express from 'express';
import { getAllUser, getUser, updateUser, deleteUser, signupUser } from '../controllers/user_perfil.controllers.js';
import { loginUser } from '../controllers/login.controllers.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { createAdmin, deleteAdmin, getAllAdmins } from '../controllers/admin-users.controllers.js'
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'

const router = express.Router()
/* JSON */

/* Rotas de Autenticação para Administradores */
//router.post('/login', loginUser); // Rota de login do administrador

// GET
router.get('/',  getAllUser)
router.get('/all',  getAllAdmins)
router.get('/:id',  getUser)

// POST
router.post('/register',  signupUser)
router.post('/register-admin',  createAdmin); // Criar um novo administrador
//router.post('/offers', authorizeRole['admin','manager','publi'], post_offer)

// PUT
router.put('/:id',  updateUser)

// DELETE
//router.delete('/admins/:id', deleteAdmin); // Deletar um administrador router.delete('/:id', deleteUser)
router.delete('/user/:id',  deleteUser)
router.delete('/delete/:id',  deleteAdmin)

// ... lembrar de colocar isso no index.js para aplicar tambem antes de entrar em /admin
//router.get('/users', isAdmin, getAllUser);

export default router