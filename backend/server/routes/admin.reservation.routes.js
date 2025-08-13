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

const router = express.Router();

/* JSON */

// GET
router.get("/", listarReservas); // Listar todas
router.get("/intervalo", buscarReservasPorIntervalo); // Buscar por intervalo de datas
router.get("/historico/:cpf", historicoHospede); // Histórico de um hóspede
router.get("/futuras/:quarto", reservasFuturtasQuarto); // Reservas futuras de um quarto
router.get("/id/:id", buscarReservaPorID); // Buscar reserva por ID

// POST
router.post("/", criarReserva); // Criar reserva

// PUT
router.put("/:id", editarReserva); // Editar reserva

// DELETE
router.delete("/:id", excluirReserva); // Excluir reserva

export default router;
