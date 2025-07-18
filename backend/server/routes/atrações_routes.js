import express from 'express';
import {getAllAtration} from '../controllers/atrações.controllers.js'
const router = express.Router()

/* JSON */

// GET
router.get('/', getAllAtration)


export default router