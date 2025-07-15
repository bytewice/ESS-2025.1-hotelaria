import express from 'express';
import {getAllUser, getUser, signupUser, updateUser, deleteUser} from '../controllers/user_perfil.controllers'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllUser)
router.get('/:id', getUser)

// POST
router.post('/signup', signupUser) //create?

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router