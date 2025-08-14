import { useState } from "react";
import * as React from "react";

interface ModalCreateReservaProps {
  onClose: () => void;
  onCreated?: () => void; // callback para atualizar a lista após criar
}

export default function ModalCreateReserva({ onClose, onCreated }: ModalCreateReservaProps) {
  const [formData, setFormData] = useState({
    cpf: "",
    dataEntrada: "",
    dataSaida: "",
    numeroQuarto: "",
    preco: "",
    pagamento: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "preco" || name === "pagamento" ? Number(value) : value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:2000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "admin"
        },
        body: JSON.stringify({
          hospedeCpf: formData.cpf,
          quarto: formData.numeroQuarto,
          checkIn: formData.dataEntrada,
          checkOut: formData.dataSaida,
          preco: formData.preco,
          pagamento: formData.pagamento
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensagem || "Erro ao criar reserva");
      }

      if (onCreated) onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Nova Reserva</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="cpf"
            placeholder="CPF do Hóspede"
            value={formData.cpf}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="dataEntrada"
            value={formData.dataEntrada}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="dataSaida"
            value={formData.dataSaida}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            name="numeroQuarto"
            placeholder="Número do Quarto"
            value={formData.numeroQuarto}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            value={formData.preco}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            name="pagamento"
            placeholder="Pagamento"
            value={formData.pagamento}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
