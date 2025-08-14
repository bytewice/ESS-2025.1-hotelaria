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
router.get("/",  listarReservas); // Listar todas (admin)
router.get("/intervalo",  buscarReservasPorIntervalo);
router.get("/historico/:cpf",  historicoHospede);
router.get("/futuras/:quarto",  reservasFuturtasQuarto);
router.get("/id/:id",  buscarReservaPorID);

// POST - Criar reserva (apenas admin)
router.post("/",  criarReserva);

// PUT - Editar reserva (apenas admin)
router.put("/:id",  editarReserva);

// DELETE - Excluir reserva (apenas admin)
router.delete("/:id",  excluirReserva);

export default router;
