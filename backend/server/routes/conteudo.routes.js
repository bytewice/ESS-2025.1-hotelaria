import express from 'express';
const router = express.Router();
import { 
  getRooms, 
  likeRoom, 
  saveRoom, 
  getSavedRooms, 
  addReview,
  shareReservation // NOVO
} from '../controllers/conteudo.controllers.js';
import { identifyUser } from '../middlewares/authMiddleware.js';

router.get('/', getRooms);
router.post('/:id/like', likeRoom);
router.post('/:id/save', identifyUser, saveRoom);
router.get('/salvos', identifyUser, getSavedRooms);
router.post('/:id/review', identifyUser, addReview);

// NOVA ROTA: Para compartilhar uma reserva.
router.post('/reservations/:reservationId/share', identifyUser, shareReservation);

export default router;