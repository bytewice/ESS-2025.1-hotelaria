import express from 'express';
import {
    criarReserva,
    editarReserva,
    excluirReserva,
    listarReservas,
    buscarReservaPorID,
    buscarReservasPorCPF,
    buscarReservasPorIntervalo,
    taxaOcupacao,
    historicoHospede,
    reservasFuturtasQuarto
} from "../controllers/reservation.controller.js";

const router = express.Router();

/* JSON */

// GET
router.get("/", listarReservas); // Listar todas
router.get("/intervalo", buscarReservasPorIntervalo); // Buscar por intervalo de datas
router.get("/taxa", taxaOcupacao); // Ver taxa de ocupação
router.get("/historico/:cpf", historicoHospede); // Histórico de um hóspede
router.get("/futuras/:quarto", reservasFuturtasQuarto); // Reservas futuras de um quarto
router.get("/cpf/:cpf", buscarReservasPorCPF); // Buscar todas as reservas por CPF do hóspede
router.get("/id/:id", buscarReservaPorID); // Buscar reserva por ID

// POST
router.post("/", criarReserva); // Criar reserva

// PUT
router.put("/:id", editarReserva); // Editar reserva

// DELETE
router.delete("/:id", excluirReserva); // Excluir reserva

export default router;
