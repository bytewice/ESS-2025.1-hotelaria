import Room from '../models/room.model.js';
import UserComum from '../models/user_comum.model.js';
import Reservation from '../models/reservation.model.js';
import User from '../models/user.model.js';

// ALTERAÇÃO: A função agora filtra por disponibilidade de datas.
export const getRooms = async (req, res) => {
  try {
    const { minPrice, maxPrice, sortByLikes, checkIn, checkOut } = req.query;
    let filter = {};
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const conflictingReservations = await Reservation.find({
        CheckIN: { $lt: checkOutDate },
        CheckOUT: { $gt: checkInDate }
      }).select('Quarto');

      const reservedRoomIds = conflictingReservations.map(res => res.Quarto);
      filter._id = { $nin: reservedRoomIds };
    }

    const sort = sortByLikes === 'true' ? { likes: -1 } : {};
    const rooms = await Room.find(filter).sort(sort);
    
    if (rooms.length === 0) {
      return res.status(404).json({ message: "Nenhum quarto disponível para os filtros selecionados" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Quarto não encontrado' });

    room.likes += 1;
    await room.save();
    
    res.status(200).json({ likes: room.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveRoom = async (req, res) => {
  try {
    const user = await UserComum.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (user.savedRooms.includes(req.params.id)) {
      return res.status(400).json({ error: 'Quarto já está salvo' });
    }

    user.savedRooms.push(req.params.id);
    await user.save();
    
    res.status(200).json({ message: 'Quarto salvo com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSavedRooms = async (req, res) => {
  try {
    const user = await UserComum.findById(req.user._id).populate('savedRooms');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.status(200).json(user.savedRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ALTERAÇÃO: Permite avaliação por hóspede principal ou compartilhado.
export const addReview = async (req, res) => {
  try {
    const { text, rating, anonymous } = req.body;
    const userId = req.user._id;
    const roomId = req.params.id;

    const reservation = await Reservation.findOne({
      Quarto: roomId,
      $or: [
        { Hospede: userId },
        { sharedWith: userId }
      ]
    });

    if (!reservation) {
      return res.status(403).json({ 
        error: 'Você deve ter feito uma reserva neste quarto para escrever avaliações' 
      });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Quarto não encontrado' });

    const review = {
      user: anonymous ? null : userId,
      text,
      rating,
      anonymous
    };

    room.reviews.push(review);
    await room.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// NOVO: Controller para compartilhar uma reserva
export const shareReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { shareWithUserEmail } = req.body;
        const ownerId = req.user._id;

        const userToShareWith = await User.findOne({ Email: shareWithUserEmail });
        if (!userToShareWith) {
            return res.status(404).json({ error: "Usuário para compartilhamento não encontrado." });
        }

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ error: "Reserva não encontrada." });
        }

        if (reservation.Hospede.toString() !== ownerId.toString()) {
            return res.status(403).json({ error: "Apenas o dono da reserva pode compartilhá-la." });
        }

        await Reservation.updateOne(
            { _id: reservationId },
            { $addToSet: { sharedWith: userToShareWith._id } }
        );

        res.status(200).json({ message: `Reserva compartilhada com sucesso com ${userToShareWith.Name}.` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};