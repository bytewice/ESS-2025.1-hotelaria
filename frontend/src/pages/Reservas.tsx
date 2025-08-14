import { useEffect, useState } from "react";
import { Reserva } from "../types";
import ModalReserva from "../components/admin.reservation/ModalReserva";
import ModalEstatisticas from "../components/admin.reservation/ModalEstatisticas";
import ModalCreateReserva from "../components/admin.reservation/ModalCreateReserva";
import "../styles/reservas.css";

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [showEstatisticas, setShowEstatisticas] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Busca inicial das reservas
  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    fetch("/reservas")
      .then(res => res.json())
      .then(data => setReservas(data))
      .catch(err => console.error("Erro ao carregar reservas:", err));
  };

  // Filtrar por intervalo de datas
  const filterByDateRange = () => {
    if (!startDate || !endDate) {
      alert("Selecione as duas datas.");
      return;
    }

    const filtered = reservas.filter(r => {
      const checkInDate = new Date(r.checkIn);
      const checkOutDate = new Date(r.checkOut);
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Retorna reservas que tenham parte do período dentro do intervalo
      return checkInDate <= end && checkOutDate >= start;
    });

    setReservas(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Você tem certeza que deseja excluir esta reserva?")) return;

    try {
      const res = await fetch(`/reservas/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("Reserva excluída com sucesso!");
        setReservas(reservas.filter(r => r._id !== id));
      } else {
        alert(data.mensagem || "Erro ao excluir reserva");
      }
    } catch (err) {
      console.error("Erro na requisição de exclusão:", err);
      alert("Erro de conexão ao tentar excluir a reserva.");
    }
  };

  return (
    <div className="home-container">
      <h1>Gerenciar Reservas</h1>
      <p>Aqui você poderá ver, adicionar e editar as reservas do hotel.</p>

      <div className="home-buttons">
        <button
          onClick={() => setOpenModalCreate(true)}
          className="reservas"
        >
          ➕ Nova Reserva
        </button>
        <button
          onClick={() => setShowEstatisticas(true)}
          className="quartos"
        >
          📊 Ver Estatísticas
        </button>
      </div>

      {/* Busca por intervalo de datas */}
      <div className="date-filter">
        <label>
          Início:
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fim:
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <button className="search-btn" onClick={filterByDateRange}>
          🔍 Buscar
        </button>
        <button className="reset-btn" onClick={fetchReservas}>
          ♻️ Resetar
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>CPF Hóspede</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Quarto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(r => (
              <tr key={r._id}>
                <td>{r.codigoReserva}</td>
                <td>{r.hospedeCpf}</td>
                <td>{new Date(r.checkIn).toLocaleDateString()}</td>
                <td>{new Date(r.checkOut).toLocaleDateString()}</td>
                <td>{r.quarto}</td>
                <td className="actions-cell">
                  <button
                    className="edit-btn"
                    onClick={() => setSelectedReserva(r)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r._id)}
                  >
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReserva && (
        <ModalReserva
          reserva={selectedReserva}
          onClose={() => setSelectedReserva(null)}
          onSave={(updatedReserva) => {
            setReservas(
              reservas.map(r => r._id === updatedReserva._id ? updatedReserva : r)
            );
            setSelectedReserva(null);
          }}
        />
      )}

      {openModalCreate && (
        <ModalCreateReserva
          onClose={() => setOpenModalCreate(false)}
          onCreated={() => {
            setOpenModalCreate(false);
            fetchReservas();
          }}
        />
      )}

      {showEstatisticas && (
        <ModalEstatisticas
          reservas={reservas}
          onClose={() => setShowEstatisticas(false)}
        />
      )}
    </div>
  );
}
