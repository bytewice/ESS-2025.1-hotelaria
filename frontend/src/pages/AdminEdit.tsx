import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ADMIN.css";
import "../styles/list-users.css"


import { useParams } from "react-router-dom";
import { detailAttraction, sendReview } from "../services/attractionApi";
import "../styles/atracaoDetalhe.css"; // Novo CSS

import { useContext } from "react";
import { AppContext } from "../Provider";

export function EditUser(){

    const { id } = useParams();
    const { nomeHotel } = useContext(AppContext);
    const a = id;
    return(
        <div className="home-container">
        <h1>AAAAAAAAAAAAAAAAAAA {nomeHotel}</h1>
        <p>AAAAAAAAAAAAAAAAAAA</p>
  
        <div className="home-buttons">
          <Link to="/atracoes" className="atracoes">AAAAAAAAAAAAAAA</Link>
          <Link to="/quartos" className="quartos">AAAAAAAAAAAAAAAA</Link>
          <Link to="/reservas" className="reservas">AAAAAAAAAAAAAAAA</Link>
        </div>
  
        <p style={{ marginTop: "40px", color: "#555" }}>
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </p>
      </div>
    );
}


export function EditAdmin(){

    const { nomeHotel } = useContext(AppContext);
    return(        
    <div className="home-container">
    <h1>AAAAAAAAAAAAAAAAAAA {nomeHotel}</h1>
    <p>AAAAAAAAAAAAAAAAAAA</p>

    <div className="home-buttons">
      <Link to="/atracoes" className="atracoes">AAAAAAAAAAAAAAA</Link>
      <Link to="/quartos" className="quartos">AAAAAAAAAAAAAAAA</Link>
      <Link to="/reservas" className="reservas">AAAAAAAAAAAAAAAA</Link>
    </div>

    <p style={{ marginTop: "40px", color: "#555" }}>
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </p>
  </div>
  );
}