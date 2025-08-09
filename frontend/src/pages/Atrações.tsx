import { useEffect, useState } from "react";
import {
  getAllAttractions,
  createAttraction,
  deleteAttraction
} from "../services/attractionApi";

export default function Atracoes() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const loadAttractions = async () => {
    try {
      const data = await getAllAttractions();
      setAttractions(data);
    } catch (err) {
      console.error("Erro ao carregar atrações", err);
    }
  };

  const handleCreate = async () => {
    if (!newName || !newDesc) return;
    await createAttraction({ name: newName, description: newDesc });
    setNewName("");
    setNewDesc("");
    loadAttractions();
  };

  const handleDelete = async (name: string) => {
    await deleteAttraction(name);
    loadAttractions();
  };

  useEffect(() => {
    loadAttractions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Atrações</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={handleCreate}>Adicionar</button>
      </div>

      <ul>
        {attractions.map((a, i) => (
          <li key={i}>
            <b>{a.name}</b> - {a.description}
            <button onClick={() => handleDelete(a.name)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
