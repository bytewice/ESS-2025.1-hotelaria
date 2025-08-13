import express from 'express';
import {
    criarReserva,
    editarReserva,
    excluirReserva,
    listarReservas,
    buscarReservaPorID,
    buscarReservasPorIntervalo,
    historicoHospede,
    reservasFuturtasQuarto
} from "../controllers/admin.reservation.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* JSON */

// Todas as rotas podem identificar o usuário
// router.use(identifyUser); NÃO SEI O QUE É ISSO ENTÃO NÃO VOU MEXER

// GET
router.get("/", protectRoute, listarReservas); // Listar todas (admin)
router.get("/intervalo", protectRoute, buscarReservasPorIntervalo);
router.get("/historico/:cpf", protectRoute, historicoHospede);
router.get("/futuras/:quarto", protectRoute, reservasFuturtasQuarto);
router.get("/id/:id", protectRoute, buscarReservaPorID);

// POST - Criar reserva (apenas admin)
router.post("/", protectRoute, criarReserva);

// PUT - Editar reserva (apenas admin)
router.put("/:id", protectRoute, editarReserva);

// DELETE - Excluir reserva (apenas admin)
router.delete("/:id", protectRoute, excluirReserva);

export default router;
