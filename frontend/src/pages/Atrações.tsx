import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/atracoes.css";

interface Attraction {
  nome: string;
  descricao: string;
}

export default function Atrações() {
  const [atracoes, setAtracoes] = useState<Attraction[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/attraction")
      .then(res => setAtracoes(res.data))
      .catch(err => console.error("Erro ao carregar atrações:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Atrações</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {atracoes.map((atracao) => (
          <div key={atracao.nome} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{atracao.nome}</h2>
            <p className="text-gray-600">{atracao.descricao}</p>
            <Link
              to={`/atrações/${encodeURIComponent(atracao.nome)}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
  Ver detalhes
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}