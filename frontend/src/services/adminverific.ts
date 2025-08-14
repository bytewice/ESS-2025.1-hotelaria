// src/services/adminverific.ts
import axios from "axios";

const API_URL = "http://localhost:2000"; // ajuste para sua rota real

interface LoginPayload {
  email: string;
  senha: string;
}

export const loginUser = async ({ email, senha }: LoginPayload) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: senha,
    });

    // Se quiser guardar o token JWT caso venha no response
    // localStorage.setItem("token", res.data.token);

    return res.data; // {_id, Name, Email, role}
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.error || "Credenciais inválidas");
    }
    throw new Error("Erro ao conectar com o servidor");
  }
};
