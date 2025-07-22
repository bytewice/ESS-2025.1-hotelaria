import express from 'express';
import {
  getAllAttraction,
  detailAttraction,
  getReview,
  sendReview,
  createAttraction
} from '../controllers/attraction.controllers.js';

const router = express.Router();


// POST 
router.post('/create', createAttraction);
router.post('/:name/review', sendReview);

// GET
router.get('/', getAllAttraction);
router.get('/:name/review', getReview);
router.get('/:name', detailAttraction);

export default router;
