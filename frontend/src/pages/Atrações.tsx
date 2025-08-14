import { useEffect, useState } from "react";
import { Reserva } from "../types";
import ModalReserva from "../components/admin.reservation/ModalReserva";
import ModalEstatisticas from "../components/admin.reservation/ModalEstatisticas";
import ModalCreateReserva from "../components/admin.reservation/ModalCreateReserva";
import "../styles/reservas.css";

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [showEstatisticas, setShowEstatisticas] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [filterType, setFilterType] = useState<"cpf" | "date" | "quarto" | null>(null);
  const [cpfFilter, setCpfFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [quartoFilter, setQuartoFilter] = useState("");

  // Busca inicial das reservas
  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    fetch("/reservas")
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setFilteredReservas(data);
      })
      .catch(err => console.error("Erro ao carregar reservas:", err));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Você tem certeza que deseja excluir esta reserva?")) return;

    try {
      const res = await fetch(`/reservas/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("Reserva excluída com sucesso!");
        setReservas(reservas.filter(r => r._id !== id));
        setFilteredReservas(filteredReservas.filter(r => r._id !== id));
      } else {
        alert(data.mensagem || "Erro ao excluir reserva");
      }
    } catch (err) {
      console.error("Erro na requisição de exclusão:", err);
      alert("Erro de conexão ao tentar excluir a reserva.");
    }
  };

  // Filtros
  const filterByCpf = () => {
    if (!cpfFilter) return alert("Digite o CPF para filtrar.");
    const filtered = reservas.filter(r => r.hospedeCpf.includes(cpfFilter));
    setFilteredReservas(filtered);
  };

  const filterByDate = () => {
    if (!startDateFilter || !endDateFilter) return alert("Selecione o intervalo de datas.");
    const start = new Date(startDateFilter);
    const end = new Date(endDateFilter);
    const filtered = reservas.filter(r => {
      const checkIn = new Date(r.checkIn);
      const checkOut = new Date(r.checkOut);
      return (checkIn >= start && checkIn <= end) || (checkOut >= start && checkOut <= end);
    });
    setFilteredReservas(filtered);
  };

  const filterByQuarto = () => {
    if (!quartoFilter) return alert("Digite o número do quarto.");
    const filtered = reservas.filter(r => r.quarto.toString() === quartoFilter);
    setFilteredReservas(filtered);
  };

  const resetFilters = () => {
    setCpfFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setQuartoFilter("");
    setFilteredReservas(reservas);
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

      {/* Filtro pop-up */}
      <div className="filter-selector">
        <label>Filtrar por:</label>
        <select value={filterType || ""} onChange={e => setFilterType(e.target.value as any)}>
          <option value="">-- Escolha --</option>
          <option value="cpf">CPF</option>
          <option value="date">Intervalo de Datas</option>
          <option value="quarto">Número do Quarto</option>
        </select>
      </div>

      <div className="filter-fields">
        {filterType === "cpf" && (
          <div className="cpf-filter">
            <input
              type="text"
              value={cpfFilter}
              onChange={e => setCpfFilter(e.target.value)}
              placeholder="Digite o CPF"
            />
            <button onClick={filterByCpf}>🔍 Buscar CPF</button>
            <button onClick={resetFilters}>♻️ Resetar</button>
          </div>
        )}

        {filterType === "date" && (
          <div className="date-filter">
            <label>De:</label>
            <input type="date" value={startDateFilter} onChange={e => setStartDateFilter(e.target.value)} />
            <label>Até:</label>
            <input type="date" value={endDateFilter} onChange={e => setEndDateFilter(e.target.value)} />
            <button onClick={filterByDate}>🔍 Buscar Datas</button>
            <button onClick={resetFilters}>♻️ Resetar</button>
          </div>
        )}

        {filterType === "quarto" && (
          <div className="quarto-filter">
            <input
              type="text"
              value={quartoFilter}
              onChange={e => setQuartoFilter(e.target.value)}
              placeholder="Número do Quarto"
            />
            <button onClick={filterByQuarto}>🔍 Buscar Quarto</button>
            <button onClick={resetFilters}>♻️ Resetar</button>
          </div>
        )}
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
            {filteredReservas.map(r => (
              <tr key={r._id}>
                <td>{r.codigoReserva}</td>
                <td>{r.hospedeCpf}</td>
                <td>{new Date(r.checkIn).toLocaleDateString()}</td>
                <td>{new Date(r.checkOut).toLocaleDateString()}</td>
                <td>{r.quarto}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => setSelectedReserva(r)}>✏️ Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(r._id)}>🗑️ Excluir</button>
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
            setReservas(reservas.map(r => r._id === updatedReserva._id ? updatedReserva : r));
            setFilteredReservas(filteredReservas.map(r => r._id === updatedReserva._id ? updatedReserva : r));
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
          reservas={filteredReservas}
          onClose={() => setShowEstatisticas(false)}
        />
      )}
    </div>
  );
}
