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
import { identifyUser, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* JSON */

// Todas as rotas podem identificar o usuário
router.use(identifyUser);

// GET
router.get("/", authorizeRole(["admin"]), listarReservas); // Listar todas (admin)
router.get("/intervalo", authorizeRole(["admin"]), buscarReservasPorIntervalo);
router.get("/historico/:cpf", authorizeRole(["admin"]), historicoHospede);
router.get("/futuras/:quarto", authorizeRole(["admin"]), reservasFuturtasQuarto);
router.get("/id/:id", authorizeRole(["admin"]), buscarReservaPorID);

// POST - Criar reserva (apenas admin)
router.post("/", authorizeRole(["admin"]), criarReserva);

// PUT - Editar reserva (apenas admin)
router.put("/:id", authorizeRole(["admin"]), editarReserva);

// DELETE - Excluir reserva (apenas admin)
router.delete("/:id", authorizeRole(["admin"]), excluirReserva);

export default router;
