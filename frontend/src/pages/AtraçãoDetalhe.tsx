import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailAttraction, sendReview } from "../services/attractionApi";
import "../styles/atracaoDetalhe.css"; // Novo CSS

interface Review {
  userName: string;
  comentario: string;
  nota: number;
  data?: string;
}

interface Attraction {
  nome: string;
  descricao: string;
  reviews?: Review[];
  imagem?: string; // opcional, se houver imagem da atração
}

export default function AtracaoDetalhe() {
  const { name } = useParams<{ name: string }>();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [userName, setUserName] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);

  const fetchData = async () => {
    try {
      if (name) {
        const data = await detailAttraction(name);
        setAttraction(data);
      }
    } catch (err) {
      console.error("Erro ao buscar atração:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!nota) {
      alert("Por favor, insira uma nota antes de enviar!");
      return;
    }
  
    try {
      await sendReview(name!, { userName, comentario, nota });
      setUserName("");
      setComentario("");
      setNota(0);
      fetchData();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
    }
  };
  

  if (!attraction) return <p className="loading">Carregando...</p>;

  return (
    <div className="atracao-detalhe-container">
      {attraction.imagem && (
        <img
          src={attraction.imagem}
          alt={attraction.nome}
          className="atracao-imagem"
        />
      )}
      <h1 className="atracao-titulo">{attraction.nome}</h1>
      <p className="atracao-descricao">{attraction.descricao}</p>

      <h2 className="reviews-titulo">Avaliações</h2>
      {attraction.reviews?.length > 0 ? (
        <ul className="reviews-list">
          {attraction.reviews.map((rev, i) => (
            <li key={i} className="review-card">
              <div className="review-header">
                <strong>{rev.userName}</strong>
                <span className="review-nota">{rev.nota}/5</span>
              </div>
              <p className="review-text">{rev.comentario}</p>
              <small className="review-data">
                {rev.data ? new Date(rev.data).toLocaleDateString() : "Data não disponível"}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-reviews">Sem avaliações ainda.</p>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        <h3>Deixe sua avaliação</h3>
        <div className="form-group">
          <label>Seu nome:</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label>Comentário:</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label>Nota (1-5):</label>
          <input
            type="number"
            value={nota}
            onChange={(e) => setNota(Number(e.target.value))}
          
          />
        </div>
        <button type="submit" className="review-button">Enviar Avaliação</button>
      </form>
    </div>
  );
}
