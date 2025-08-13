import { useContext } from "react";
import { AppContext } from "../Provider";

export default function Home() {
  const { nomeHotel } = useContext(AppContext);

  return (
    <div>
      <h1>Bem-vindo ao {nomeHotel}</h1>
      <p>Sistema de gestão de hotelaria</p>
    </div>
  );
}