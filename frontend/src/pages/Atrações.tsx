import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/atracoes.css";

interface Attraction {
  nome: string;
  descricao: string;
  tipo?: string; // opcional
  imagem?: string; // opcional, url da imagem
}

export default function Atrações() {
  const [atracoes, setAtracoes] = useState<Attraction[]>([]);

  useEffect(() => {
    axios.get("http://localhost:2000/attraction")
      .then(res => setAtracoes(res.data))
      .catch(err => console.error("Erro ao carregar atrações:", err));
  }, []);

  return (
    <div className="atracoes-container">
      <h1>Atrações</h1>
      <div className="atracoes-grid">
        {atracoes.map((atracao) => (
          <div key={atracao.nome} className="atracao-card">
            {atracao.imagem && <img src={atracao.imagem} alt={atracao.nome} className="atracao-img" />}
            <h2>{atracao.nome}</h2>
            {atracao.tipo && <span className="atracao-badge">{atracao.tipo}</span>}
            <p>{atracao.descricao}</p>
            <Link to={`/atracoes/${encodeURIComponent(atracao.nome)}`} className="atracao-button">
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
