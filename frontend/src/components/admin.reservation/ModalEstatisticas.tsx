import React from "react";
import { Reserva } from "../../types"; // Certifique-se de ter o tipo Reserva

type ModalEstatisticasProps = {
  onClose: () => void;
  reservas: Reserva[];        // Lista de reservas para cálculo
  totalUsuarios?: number;     // Ainda pode passar se tiver info do backend
  totalQuartos?: number;      // Total de quartos do hotel
};

export default function ModalEstatisticas({
  onClose,
  reservas,
  totalUsuarios = 45,
  totalQuartos = 100,
}: ModalEstatisticasProps) {
  // Calcula total de reservas ativas (que não estão canceladas)
  const totalReservas = reservas.length;

  // Calcula taxa de ocupação considerando o número de quartos
  const quartosOcupadosHoje = reservas.filter(reserva => {
    const hoje = new Date();
    return new Date(reserva.checkIn) <= hoje && hoje <= new Date(reserva.checkOut);
  }).length;

  const taxaOcupacao = Math.round((quartosOcupadosHoje / totalQuartos) * 100);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">📊 Estatísticas Gerais</h2>

        <div className="space-y-2">
          <p><strong>Taxa de ocupação:</strong> {taxaOcupacao}%</p>
          <p><strong>Número total de reservas:</strong> {totalReservas}</p>
          <p><strong>Número de usuários:</strong> {totalUsuarios}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-all duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
