import React, { useState } from "react";
import { Reserva } from "../../types";

type ModalReservaProps = {
  reserva: Reserva;
  onClose: () => void;
  onSave: (reserva: Reserva) => void;
};

export default function ModalReserva({ reserva, onClose, onSave }: ModalReservaProps) {
  const [checkIn, setCheckIn] = useState(reserva.checkIn.split("T")[0]);
  const [checkOut, setCheckOut] = useState(reserva.checkOut.split("T")[0]);
  const [quarto, setQuarto] = useState(reserva.quarto);

  const handleSave = async () => {
    try {
      const res = await fetch(`/reservas/${reserva._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut, quarto }),
      });

      const data = await res.json();
      if(res.ok) {
        onSave(data.reserva);
      } else {
        alert(data.mensagem || "Erro ao atualizar reserva");
      }
    } catch(err) {
      console.error(err);
      alert("Erro ao atualizar reserva");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>

        <div className="flex flex-col gap-2">
          <label>Check-in:</label>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-1 rounded"/>
          
          <label>Check-out:</label>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-1 rounded"/>
          
          <label>Quarto:</label>
          <input type="text" value={quarto} onChange={e => setQuarto(e.target.value)} className="border p-1 rounded"/>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}
