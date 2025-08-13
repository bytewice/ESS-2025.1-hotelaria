import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailAttraction, sendReview } from "../services/attractionApi";

export default function AtracaoDetalhe() {
  const { name } = useParams<{ name: string }>();
  const [attraction, setAttraction] = useState<any>(null);

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

  if (!attraction) return <p>Carregando...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{attraction.nome}</h1>
      <p className="mb-4">{attraction.descricao}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Avaliações</h2>
      {attraction.reviews?.length > 0 ? (
        <ul className="space-y-3">
          {attraction.reviews.map((rev: any, i: number) => (
            <li key={i} className="border rounded p-3 bg-gray-50">
              <strong>{rev.userName}</strong> — Nota: {rev.nota}
              <p>{rev.comentario}</p>
              <small>
                {rev.data
                  ? new Date(rev.data).toLocaleDateString()
                  : "Data não disponível"}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem avaliações ainda.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label className="block">Seu nome:</label>
          <input
            className="border p-2 w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Comentário:</label>
          <textarea
            className="border p-2 w-full"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Nota (1-5):</label>
          <input
            type="number"
            min={1}
            max={5}
            className="border p-2 w-full"
            value={nota}
            onChange={(e) => setNota(Number(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar Avaliação
        </button>
      </form>
    </div>
  );
}