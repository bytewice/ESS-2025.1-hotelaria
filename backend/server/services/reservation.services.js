import Reservation from "../models/reservation.model.js";

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

// Calcula a taxa de ocupação dos quartos em um intervalo de datas
export const calcularTaxaDeOcupacao = async (inicio, fim) => {
  const reservas = await Reservation.find({
    checkIn: { $lte: new Date(fim) },
    checkOut: { $gte: new Date(inicio) }
  });

  const totalQuartos = 10; // ou buscar dinamicamente
  const dias = (new Date(fim) - new Date(inicio)) / (1000 * 60 * 60 * 24);
  const ocupados = reservas.length;

  if (dias <= 0 || totalQuartos === 0) return 0;

  const taxa = (ocupados / (totalQuartos * dias)) * 100;
  return taxa.toFixed(2);
};
