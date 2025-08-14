import { useEffect, useState } from "react";
import {
  getAllAttractions,
  createAttraction,
  deleteAttraction,
} from "../services/attractionApi";
import "../styles/adminAttractions.css";

interface Attraction {
  nome: string;
  descricao: string;
}

export default function AdminAttractions() {
  const [atracoes, setAtracoes] = useState<Attraction[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const fetchAttractions = async () => {
    try {
      const data = await getAllAttractions();
      setAtracoes(data);
    } catch (err) {
      console.error("Erro ao carregar atrações:", err);
    }
  };

  useEffect(() => {
    fetchAttractions();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !descricao) return;
    try {
      await createAttraction({ name: nome, description: descricao });
      setNome("");
      setDescricao("");
      fetchAttractions();
    } catch (err) {
      console.error("Erro ao criar atração:", err);
    }
  };

  const handleDelete = async (nome: string) => {
    if (!confirm(`Deseja deletar a atração "${nome}"?`)) return;
    try {
      await deleteAttraction(nome);
      fetchAttractions();
    } catch (err) {
      console.error("Erro ao deletar atração:", err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Administração de Atrações</h1>

      <form onSubmit={handleCreate} className="admin-form">
        <input
          type="text"
          placeholder="Nome da atração"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Criar Atração</button>
      </form>

      <h2>Atrações Existentes</h2>
      <ul className="admin-list">
        {atracoes.map((a) => (
          <li key={a.nome} className="admin-item">
            <div>
              <strong>{a.nome}</strong>
              <p>{a.descricao}</p>
            </div>
            <button onClick={() => handleDelete(a.nome)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}