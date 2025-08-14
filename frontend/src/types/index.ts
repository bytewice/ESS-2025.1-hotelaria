export interface Reserva {
  _id: string;
  codigoReserva: string;
  preco: number;
  checkIn: string; // ISO date string
  checkOut: string;
  quarto: string;
  hospedeCpf: string;
  pagamento?: number;
}

export interface Estatisticas {
  ocupacao: number;
  totalReservas: number;
  totalUsuarios: number;
  checkins: number;
}
