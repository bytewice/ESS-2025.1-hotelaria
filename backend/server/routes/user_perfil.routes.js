import express from 'express';
import {getAllUser, getUser, signupUser, updateUser, deleteUser, addCartao} from '../controllers/user_perfil.controllers.js'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllUser)
router.get('/:id', getUser)

// POST
router.post('/signup', signupUser) //create?
router.post('/:id/metodo', addCartao)

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router