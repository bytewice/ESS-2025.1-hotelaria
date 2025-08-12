import express from 'express';
import {getUser, signupUser, updateUser, deleteUser} from '../controllers/user_perfil.controllers.js'

const router = express.Router()

/* JSON */

// GET
// router.get('/', getAllUser) **essa rota não pode existir no usuário comum
router.get('/:id', getUser)

// POST
router.post('/signup', signupUser)
//router.post('/:id/metodo', addMetodo)

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router