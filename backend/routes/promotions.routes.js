import express from 'express';
import {get_all_promotions, get_promotions, add_promotions, edit_promotions, delete_promotions} from '../controllers/promotions.controllers.js'
const router = express.Router()

// GET
router.get('/', get_all_promotions)
router.get('/:promotion_name',get_promotions)

//POST
router.post('/', add_promotions)

//PUT
router.put('/:promotion_name', edit_promotions)

//DELETE
router.delete('/:promotion_name',delete_promotions)

export default router