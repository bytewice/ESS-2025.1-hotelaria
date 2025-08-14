import express from 'express';
import { getAllUser, getUser, updateUser, deleteUser, signupUser } from '../controllers/user_perfil.controllers.js';
import { loginUser } from '../controllers/login.controllers.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { createAdmin, deleteAdmin, getAllAdmins } from '../controllers/admin-users.controllers.js'
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'

const router = express.Router()
/* JSON */

// todas essas rotas deveriam ter o protectRoute antes da função ser usada, 
// entretanto, quando estava fazendo o front tive problema com isso então vou terminar sem...

// GET
router.get('/', getAllUser)
router.get('/all', getAllAdmins)
router.get('/get/:id', getUser)

// POST
router.post('/register', signupUser)
router.post('/register-admin', createAdmin); // Criar um novo administrador

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/user/:id', deleteUser)
router.delete('/delete/:id', deleteAdmin)

export default router