import express from 'express';
//import { getAllJson, getBookByIdJson, writeBookJson, updateBookJson, deleteBookJson } from '../controllers/book.json.controllers.js'
//import {funções definidas no controler} from 'rota do arquivo no controler'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllUser)
router.get('/:id', getUser)

// POST
router.post('/', createUser)

// PUT
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router