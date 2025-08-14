import express from 'express';
import {get_all_credit_card, get_credit_card, add_credit_card, edit_credit_card, delete_credit_card} from '../controllers/credit_cards.controllers.js'
const router = express.Router()

// GET
router.get('/', get_all_credit_card)
router.get('/:card_name',get_credit_card)

//POST
router.post('/', add_credit_card)

//PUT
router.put('/:card_name', edit_credit_card)

//DELETE
router.delete('/:card_name',delete_credit_card)

export default router