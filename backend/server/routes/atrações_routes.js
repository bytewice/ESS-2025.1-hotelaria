import express from 'express';
import {getAllAtration} from '../controllers/atrações.controllers.js'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllAtration)
router.get('/:name', detailAtration )
router.get('/:name/review', getReview)

// Post
router.post('/:name/review', sendReview)

export default router