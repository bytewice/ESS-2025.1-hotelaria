import Reservation from "../models/admin.reservation.model.js";
import {verificarConflito} from "../services/admin.reservation.services.js"

const gerarCodigoReserva = async () => {
    const ultimaReserva = await Reservation.findOne().sort({codigoReserva: -1}).limit(1);

    let novoCodigo = "00001";
    if(ultimaReserva && ultimaReserva.codigoReserva) {
        const ultimoNumero = parseInt(ultimaReserva.codigoReserva);
        novoCodigo = (ultimoNumero + 1).toString().padStart(5, "0");
    }

    return novoCodigo;
};

//Criar reserva
export const criarReserva = async (req, res) => {

    try{
        const {preco, checkIn, checkOut, quarto, hospedeCpf, pagamento} = req.body;

        //Gerar codigo de reserva
        const codigoReserva = await gerarCodigoReserva();

        //Verificar conflito
        const conflito = await verificarConflito(quarto, checkIn, checkOut);
        if(conflito) {
            return res.status(400).json({mensagem: "Conflito de data detectado"});
        }

        const novaReserva = new Reservation({
            codigoReserva,
            preco,
            checkIn,
            checkOut,
            quarto,
            hospedeCpf,
            pagamento, //not required
    
        });
        
        await novaReserva.save();
        res.status(201).json({mensagem: "Reserva criada com sucesso", reserva: novaReserva});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

//Editar reserva
export const editarReserva = async (req, res) => {
    try{
        const {id} = req.params;
        const {checkOut} = req.body;

        const reserva = await Reservation.findById(id);
        if(!reserva) return res.status(404).json({mensagem: "Reserva não encontrada"});

        const conflito = await verificarConflito(reserva.quarto, reserva.checkIn, reserva.checkOut, id);
        if(conflito){
            return res.status(400).json({mensagem: "Conflito de data detectado"});
        }

        reserva.checkOut = checkOut;
        await reserva.save();

    res.json({mensagem: "Reserva atualizada com sucesso", reserva});
    } catch(error) {
        res.status(500).json({erro: error.message});
    }
};

//Excluir reserva
export const excluirReserva = async (req, res) => {
    try{
        const {id} = req.params;
        const reserva = await Reservation.findByIdAndDelete(id);
        if (!reserva) return res.status(404).json({mensagem: "Reserva não encontrada"});

        res.json({mensagem: "Reserva excluída com sucesso"});
    }catch(erorr){
        res.status(500).json({erro: error.message});
    }
};

//Listar todas as reservas
export const listarReservas = async (req, res) => {
    try {
        const reservas = await Reservation.find().sort({checkIn: 1});
        res.json(reservas);
    }catch(error){
        res.status(500).json({erro: error.message});
    }
};

//Buscar uma reserva pelo ID
export async function buscarReservaPorID(req, res) {
  try {
    const { id } = req.params;

    const reserva = await Reservation.findOne({ _id: id });

    if (!reserva) {
      return res.status(404).json({ mensagem: "Reserva não encontrada para o ID informado." });
    }

    res.status(200).json(reserva);
  } catch (erro) {
    res.status(500).json({erro: error.message});
  }
}

//Buscar reservas por intervalo de datas
export const buscarReservasPorIntervalo = async (req, res) => {
    try{
        const {inicio, fim} = req.query;
        const reservas = await Reservation.find({
            checkIn: {$lte: new Date(fim)},
            checkOut: {$gte: new Date(inicio)}
        });
        res.json(reservas)
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
}; 

//Ver histórico de um hóspede
export const historicoHospede = async (req, res) => {
    try{
        const {cpf} = req.params;
        const reservas = await Reservation.find({hospedeCpf: cpf}).sort({checkIn: -1});
        res.json(reservas);
    }catch (error) {
        res.status(500).json({erro: error.message});
    }
}

//Listar reservas futuras de um quarto
export const reservasFuturtasQuarto = async (req, res) => {
    try{
        const {quarto} = req.params;
        const hoje = new Date();
        const reservas = await Reservation.find({
            quarto,
            checkIn: {$gt: hoje}
        }).sort({checkIn: 1});
        res.json(reservas);
    }catch (error) {
        res.status(500).json({erro: error.message});
    }
}
