import Reservation from "../models/admin.reservation.model.js";

// Verifica se há conflito de reservas em um quarto para determinado intervalo de datas
export const verificarConflito = async (quarto, checkIn, checkOut, id = null) => {
  const conflito = await Reservation.findOne({
    quarto,
    _id: { $ne: id }, // exclui a reserva atual (em caso de edição)
    $or: [
      { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
    ]
  });

  return !!conflito; // true se houver conflito
};
