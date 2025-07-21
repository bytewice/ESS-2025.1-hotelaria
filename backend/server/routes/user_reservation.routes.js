import express from 'express';
//import { getAllJson, getBookByIdJson, writeBookJson, updateBookJson, deleteBookJson } from '../controllers/book.json.controllers.js'
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllreservation)
router.get('/:id', getReservation)

// POST
router.post('/', createReservation)

// PUT
router.put('/:id', updateReservation)

// DELETE
router.delete('/:id', deleteReservation)

export default router