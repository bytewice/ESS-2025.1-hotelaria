import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  // NOVO CAMPO: Adicionado para identificação única e amigável do quarto.
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Suíte 1 pessoa',
      'Suíte Casal',
      '1 Suíte 4 pessoas (2 casais)',
      '1 Suíte 4 pessoas (1 casal)',
      'Quarto 1 pessoa',
      'Quarto Casal',
      'Quarto 4 pessoas'
    ]
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    rating: Number,
    anonymous: Boolean,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;