import express from 'express';
import { getAllUser, getUser, updateUser, deleteUser } from '../controllers/user_perfil.controllers';
//import { getAllJson, getBookByIdJson, writeBookJson, updateBookJson, deleteBookJson } from '../controllers/book.json.controllers.js'
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'
const router = express.Router()

// criar e editar usuários comuns
// deletar usuários comuns

/* JSON */

// GET
router.get('/', getAllUser)
router.get('/:id', getUser)

// POST
router.post('/register', signupUser) //create?

//router.post('/:id/metodo', addMetodo) 

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router